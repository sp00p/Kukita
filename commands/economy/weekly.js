const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");
const humanizeDuration = require("humanize-duration");
const cooldown = require("../../models/cooldowns.js")

module.exports.run = async (bot, message, args) => {

  const author = await message.author.id

  let moneyEmbed = new MessageEmbed()
    .setTitle("Money")
    .setThumbnail(message.author.displayAvatarURL)

  cooldown.findOne({serverID: message.guild.id, userID: message.author.id, command: 'weekly'}, (err, data) => {
    if (err) console.log(err)

    if (!data) {

      Money.findOne({ userID: message.author.id, serverID: message.guild.id}, (err, res) => {
        if (err) console.log(err);

        if(!res) {
          let newMoneyAcc = new Money({
            userID: message.author.id,
            username: author,
            serverID: message.guild.id,
            money: 700
          })
          message.channel.send("Congratulations, you have earned $700. Don't spend it all in one place!")
          let newCooldown = new cooldown({
            serverID: message.guild.id,
            userID: message.author.id,
            command: 'weekly',
            cooldown: Date.now() + 6.048e+8
          })
          newCooldown.save()
        } else if (res){

          res.money = res.money + 700
          res.save()
          message.channel.send("Congratulations, you have earned $700. Don't spend it all in one place!")
          let newCooldown = new cooldown({
            serverID: message.guild.id,
            userID: message.author.id,
            command: 'weekly',
            cooldown: Date.now() + 6.048e+8
          })
          newCooldown.save()
        }
      })
    } else if (data) {

        var remaining = humanizeDuration(data.cooldown - Date.now(), { conjunction: " and ", units: ["d", "h", "m", "s"], round: true});
        let cooldownEmbed = new MessageEmbed()
          .setTitle("Uh oh!")
          .setColor("#fc0404")
          .setDescription(`You can only use that command once a week! You still have ${remaining} to wait!`)

        message.channel.send(cooldownEmbed)

    }
  })
}

module.exports.help = {
  name: "weekly",
  description: "gives you a weeks worth of money",
  arguments: "",
  category: "Economy",
  aliases: ["weekly"]
};
