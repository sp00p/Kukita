const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");
const humanizeDuration = require("humanize-duration");
const cooldown = require("../../models/cooldowns.js")

module.exports.run = async (bot, message, args) => {

  if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  let moneyMade = Math.floor(Math.random() * 50) + 1

  let workEmbed = new MessageEmbed()
    .setTitle("Shift over!")
    .setDescription(`You worked for ${Math.floor(Math.random() * 6) + 1} hours and made $${moneyMade}`)
    .setColor("RANDOM")

    Money.findOne({ userID: message.author.id}, (err, data) => {
      if (err) console.log(err);

      cooldown.findOne({userID: message.author.id, command: 'work'}, (err, res) => {
        if (err) console.log(err)

        if (!res) {
          //console.log('cooldown does not exist')

          if(!data) {
            //console.log('user does not have a cooldown and does not have money')
            let noAccountEmbed = new MessageEmbed()
            .setTitle("Oh no!")
            .setColor("#FF0000")
            .setDescription(`You don't have an account yet! Use ${bot.prefix}createaccount to create one!`)
            //console.log('new money account created, user did not have an account ')

            return message.channel.send(noAccountEmbed)

          } else if (data){

            data.money = data.money + moneyMade;
            data.save()
            message.channel.send(workEmbed)

            if(!res) {
              //console.log('cooldown does not exist but user has account')
              let newCooldown = new cooldown({
                userID: message.author.id,
                command: 'work',
                cooldown: Date.now() + 1.44e+7
              })
              newCooldown.save()
            } else if (res) {
              //console.log('cooldown exists and user has money, updating cooldown')
              res.cooldown = Date.now() + 1.44e+7
            }
          }
        } else if (res.cooldown > Date.now()) {
          //console.log('cooldown more than date')

          var remaining = humanizeDuration(res.cooldown - Date.now(), { conjunction: " and ", units: ["h", "m", "s"], round: true});

          let workCooldownEmbed = new MessageEmbed()
            .setTitle("Uh oh!")
            .setColor("#fc0404")
            .setDescription(`You can only use that command once every 4 hours!\nYour shift doesn't start for another ${remaining}!`)

          message.channel.send(workCooldownEmbed)
        } else if (res.cooldown < Date.now()) {
          //console.log('cooldown less than date')
          data.money = data.money + moneyMade;
          data.save()
          message.channel.send(workEmbed)
          res.cooldown = Date.now() + 1.44e+7
        }

    })
  })
}


module.exports.help = {
  name: "work",
  description: "allows you to work for money",
  arguments: "",
  category: "Economy",
  aliases: ["work"]
};
