const { MessageEmbed } = require("discord.js");
const humanizeDuration = require("humanize-duration");
const mainSchema = require('../../models/mainschema.js')

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  if (!bot.config.betatesters.includes(message.author.id)) return
  if (!bot.config.betatestingchannelid.includes(message.channel.id)) return

  let robEmbed = new MessageEmbed()

  let noAccountEmbed = new MessageEmbed()
  .setTitle("Oh no!")
  .setColor("#FF0000")
  .setDescription(`You don't have an account yet! Use ${bot.prefix}createaccount to create one!`)

  let noAccountMentionedUserEmbed = new MessageEmbed()
  .setTitle("Oh no!")
  .setColor("#FF0000")
  .setDescription(`That user doesn't have an account yet! They can use ${bot.prefix}createaccount to create one!`)

  let passiveModeOnEmbed = new MessageEmbed()
  .setTitle("Oh no!")
  .setColor("#FF0000")
  .setDescription("You are in passive mode! Type .rob passive to change your status!")

  let mentionedPassiveModeOnEmbed = new MessageEmbed()
  .setTitle("Oh no!")
  .setColor("#FF0000")
  .setDescription("That user has passive mode enabled!")

  let moneyTooLowEmbed = new MessageEmbed()
  .setTitle("Oh no!")
  .setColor("#FF0000")
  .setDescription("You don't have enough money to disable passive mode! You must have at least $1000!")

  let chance = Math.floor(Math.random() * 100) + 1

  mainSchema.findOne({userID: message.author.id}, (err, res) => {

    if (!res) { // if mentioned user doesn't have an account
      return message.channel.send(noAccountEmbed)

    } else if (res) { // is author has an account

      mainSchema.findOne({userID: message.mentions.users.first().id}, (err, data) => {

        if (!data) { // if mentioned user doesn't have an account
          return message.channel.send(noAccountMentionedUserEmbed)

        } else if (res.isPassive === true) { // if author is passive

          return message.channel.send(mentionedPassiveModeOnEmbed)

        } else if (data.isPassive === true) { // if mentioned user is passive

          return message.channel.send(passiveModeOnEmbed)

        } else if (args[0] === "passive") { // if .rob passive

          if (res.money < 1000) { // if author's money is below 1000

            return message.channel.send(moneyTooLowEmbed)

          } else if (res.money > 1000) { // if author's money is above 1000
            if (res.isPassive === false ){ // if author is not passive set passive

              res.isPassive = true
              res.save()

              return message.channel.send("You have successfully become passive!")

            } else if (res.isPassive === true) { // if author is passive set not passive

              res.isPassive = false
              res.save()

              return message.channel.send("You have successfully disabled passive mode!")
            }
          }
        } else if (data.isPassive === false) {

          if (res.robCooldown > Date.now()) {

            var remaining = humanizeDuration(res.robCooldown - Date.now(), { conjunction: " and ", units: ["d", "h", "m", "s"], round: true});

            let robCooldownEmbed = new MessageEmbed()
              .setTitle("Uh oh!")
              .setColor("#FF0000")
              .setDescription(`You can only use that command once ever 3 minutes!\nYou still have ${remaining} to wait!`)

            return message.channel.send(robCooldownEmbed)


          } else if (res.robCooldown < Date.now()) {

            if (data.money < 1000) return message.channel.send("That user doesn't have enough money to steal!")

            if(chance <= 45) {

              let moneyStolen = Math.floor(Math.random() * res.money/2) + 1

              let successRobEmbed = new MessageEmbed()
              .setTitle("Success!")
              .setColor("00FF00")
              .setDescription(`${message.author} rocked ${message.mentions.users.first()}\'s ass and stole $${moneyStolen}!`)

              data.money = data.money - moneyStolen
              res.money = res.money + moneyStolen
              res.robCooldown = Date.now() + 180000
              res.save()
              data.save()

              return message.channel.send(successRobEmbed)


            } else if (chance > 45) {

              let moneyFined = Math.floor(Math.random() * data.money/2) + 1

              let failRobEmbed = new MessageEmbed()
              .setTitle("🚓Oh no!🚓")
              .setColor("#FF0000")
              .setDescription(`You were caught stealing and have been fined $${moneyFined}`)

              res.money = res.money - moneyFined
              res.robCooldown = Date.now() + 180000
              res.save()

              return message.channel.send(failRobEmbed)
            }

          }

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
