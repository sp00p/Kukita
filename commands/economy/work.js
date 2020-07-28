const { MessageEmbed } = require("discord.js");
const humanizeDuration = require("humanize-duration");
const mainSchema = require('../../models/mainschema.js')

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  //if (!bot.config.betatesters.includes(message.author.id)) return
  //if (!bot.config.betatestingchannelid.includes(message.channel.id)) return

  let moneyMade = Math.floor(Math.random() * 50) + 1

  let workEmbed = new MessageEmbed()
    .setTitle("Shift over!")
    .setDescription(`You worked for ${Math.floor(Math.random() * 6) + 1} hours and made ${moneyMade} coins!`)
    .setColor("RANDOM")

  let noAccountEmbed = new MessageEmbed()
    .setTitle("Oh no!")
    .setColor("#FF0000")
    .setDescription(`You don't have an account yet! Use ${bot.prefix}create to create one!`)

  mainSchema.findOne({ userID: message.author.id}, (err, data) => {
    if (err) console.log(err);

      if (!data) {
        return message.channel.send(noAccountEmbed)
      } else if (data) {

        if (data.workCooldown < Date.now()) {

          data.money = data.money + moneyMade
          data.workCooldown = Date.now() + 1.44e+7
          data.save()
          return message.channel.send(workEmbed)

        } else if (data.workCooldown > Date.now()) {
          var remaining = humanizeDuration(data.workCooldown - Date.now(), { conjunction: " and ", units: ["h", "m", "s"], round: true});

          let workCooldownEmbed = new MessageEmbed()
            .setTitle("Uh oh!")
            .setColor("#fc0404")
            .setDescription(`You can only use that command once every 4 hours!\nYou still have to wait ${remaining}!`)

          return message.channel.send(workCooldownEmbed)
        }

      }
    })
}

module.exports.help = {
  name: "work",
  description: "allows you to work for money",
  arguments: "",
  category: "Economy",
  aliases: ["work"]
};
