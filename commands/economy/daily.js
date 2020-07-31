const { MessageEmbed } = require("discord.js");
const humanizeDuration = require("humanize-duration");
const mainSchema = require("../../models/mainschema.js")

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  //if (!bot.config.betatesters.includes(message.author.id)) return
  //if (!bot.config.betatestingchannelid.includes(message.channel.id)) return

  let dailyWorkEmbed = new MessageEmbed()
    .setTitle("Congratulations!")
    .setDescription(`You got 100 coins! Don't spend it all in one place!`)
    .setColor("RANDOM")

  mainSchema.findOne({ userID: message.author.id}, (err, data) => {
    if (err) console.log(err);

    if(!data) {
      //console.log('user does not have a cooldown and does not have money')
      let noAccountEmbed = new MessageEmbed()
        .setTitle("Oh no!")
        .setColor("#FF0000")
        .setDescription(`You don't have an account yet! Use ${bot.prefix}create to create one!`)
          //console.log('new money account created, user did not have an account ')

        return message.channel.send(noAccountEmbed)

    } else if (Date.now() - data.dailyCooldown >= 8.64e+7){

          data.money = data.money + 100;
          data.dailyCooldown = Date.now() + 8.64e+7
          data.save()
          return message.channel.send(dailyWorkEmbed)

    } else if (Date.now() - data.dailyCooldown < 8.64e+7) {
        //console.log('cooldown more than date')

        var remaining = humanizeDuration(data.dailyCooldown - Date.now(), { conjunction: " and ", units: ["d", "h", "m", "s"], round: true});

        let dailyCooldownEmbed = new MessageEmbed()
          .setTitle("Uh oh!")
          .setColor("#FF0000")
          .setDescription(`You can only use that command once per day!\nYou still have ${remaining} to wait!`)

        return message.channel.send(dailyCooldownEmbed)

      } else {
        console.log("none of it worked lol")
      }

    })
}

module.exports.help = {
  name: "daily",
  description: "gives you a days worth of coins",
  arguments: "",
  category: "Economy",
  aliases: ["daily"]
};
