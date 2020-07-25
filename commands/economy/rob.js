const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");
const cooldown = require("../../models/cooldowns.js")
const humanizeDuration = require("humanize-duration");

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  if (!bot.config.betatesters.includes(message.author.id)) return message.channel.send("This command currently being beta tested!")

  let robEmbed = new MessageEmbed()

  let noAccountEmbed = new MessageEmbed()
  .setTitle("Oh no!")
  .setColor("#FF0000")
  .setDescription(`You don't have an account yet! Use ${bot.prefix}createaccount to create one!`)

  noAccountMentionedUserEmbed = new MessageEmbed()
  .setTitle("Oh no!")
  .setColor("#FF0000")
  .setDescription(`That user doesn't have an account yet! They can use ${bot.prefix}createaccount to create one!`)

  let chance = Math.floor(Math.random() * 100) + 1

  cooldown.findOne({userID: message.author.id, command: 'rob'}, (err, res) => {

    if (err) console.log(err)

    if (!res) {
      Money.findOne({userID: message.mentions.users.first().id}, (err, data) => {
        if (!data) {
            return message.channel.send(noAccountMentionedUserEmbed)
        } else if (data) {

          Money.findOne({userID: message.author.id}, (err, res) => {

            if (!res) {
              return message.channel.send(noAccountEmbed)
            } else if (res) {

              if (data.money < 1000) return message.channel.send("That user doesn't have enough money to steal!")

              if(chance <= 45) {

                let moneyStolen = Math.floor(Math.random() * data.money/2) + 1

                let successRobEmbed = new MessageEmbed()
                .setTitle("Success!")
                .setColor("00FF00")
                .setDescription(`${message.author} rocked ${message.mentions.users.first()}\'s ass and stole $${moneyStolen}!`)

                data.money = data.money - moneyStolen
                res.money = res.money + moneyStolen
                res.save()
                data.save()

                let newCooldown = new cooldown({
                  userID: message.author.id,
                  command: 'rob',
                  cooldown: Date.now() + 180000
                })
                newCooldown.save()

                return message.channel.send(successRobEmbed)


              } else if (chance > 45) {

                let moneyFined = Math.floor(Math.random() * res.money/2) + 1

                let failRobEmbed = new MessageEmbed()
                .setTitle("🚓Oh no!🚓")
                .setColor("#FF0000")
                .setDescription(`You were caught stealing and have been fined $${moneyFined}`)

                res.money = res.money - moneyFined
                res.save()

                let newCooldown = new cooldown({
                  userID: message.author.id,
                  command: 'rob',
                  cooldown: Date.now() + 180000
                })
                newCooldown.save()

                return message.channel.send(failRobEmbed)
              }
            }
          })
        }
      })

    } else if (res.cooldown > Date.now()){

      var remaining = humanizeDuration(res.cooldown - Date.now(), { conjunction: " and ", units: ["d", "h", "m", "s"], round: true});

      let robCooldownEmbed = new MessageEmbed()
        .setTitle("Uh oh!")
        .setColor("#FF0000")
        .setDescription(`You can only use that command once ever 3 minutes!\nYou still have ${remaining} to wait!`)

      return message.channel.send(robCooldownEmbed)

    } else if (res.cooldown < Date.now()) {

      Money.findOne({userID: message.mentions.users.first().id}, (err, data) => {
        if (!data) {
            return message.channel.send(noAccountMentionedUserEmbed)
        } else if (data) {

          Money.findOne({userID: message.author.id}, (err, res) => {

            if (!res) {
              return message.channel.send(noAccountEmbed)
            } else if (res) {

              if(chance <= 45) {

                let moneyStolen = Math.floor(Math.random() * data.money/2) + 1

                let successRobEmbed = new MessageEmbed()
                .setTitle("Success!")
                .setDescription(`${message.author} rocked ${message.mentions.users.first()}\'s ass and stole $${moneyStolen}!`)

                data.money = data.money - moneyStolen
                res.money = res.money + moneyStolen
                res.save()
                data.save()

                let newCooldown = new cooldown({
                  userID: message.author.id,
                  command: 'rob',
                  cooldown: Date.now() + 180000
                })
                newCooldown.save()

                return message.channel.send(successRobEmbed)


              } else if (chance > 45) {

                let moneyFined = Math.floor(Math.random() * res.money/2) + 1

                let failRobEmbed = new MessageEmbed()
                .setTitle("🚓Oh no!🚓")
                .setDescription(`You were caught stealing and have been fined $${moneyFined}`)

                let newCooldown = new cooldown({
                  userID: message.author.id,
                  command: 'rob',
                  cooldown: Date.now() + 180000
                })
                newCooldown.save()

                console.log('eeeee')

                res.money = res.money - moneyFined
                res.save()
                return message.channel.send(failRobEmbed)

              }
            }
          })
        }
      })

    }

  })

}

module.exports.help = {
  name: "rob",
  description: "lets you rob another player",
  arguments: "<player to rob>",
  category: "Economy",
  aliases: ["rob"]
};
