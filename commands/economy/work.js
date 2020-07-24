const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");
const humanizeDuration = require("humanize-duration");
const cooldown = require("../../models/cooldowns.js")

module.exports.run = async (bot, message, args) => {

  cooldown.findOne({serverID: message.guild.id, userID: message.author.id, command: 'work'}, (err, data) => {
    if (err) console.log(err)

    if (!data) {

      let moneyMade = Math.floor(Math.random() * 50) + 1

      let workEmbed = new MessageEmbed()
        .setTitle("Shift over!")
        .setDescription(`You worked for ${Math.floor(Math.random() * 6) + 1} hours and made $${moneyMade}`)
        .setColor("RANDOM")

        Money.findOne({ userID: message.author.id, serverID: message.guild.id, command: 'work'}, (err, data) => {
          if (err) console.log(err);

          if(!data) {
            let newMoneyAcc = new Money({
              userID: message.author.id,
              username: message.author.username,
              serverID: message.guild.id,
              money: moneyMade
            })
            newMoneyAcc.save()
            message.channel.send(workEmbed)

            let newCooldown = new cooldown({
              serverID: message.guild.id,
              userID: message.author.id,
              command: 'work',
              cooldown: Date.now() + 1.44e+7
            })
            newCooldown.save()

          } else {

            data.money = data.money + moneyMade;
            data.save()
            message.channel.send(workEmbed)

            let newCooldown = new cooldown({
              serverID: message.guild.id,
              userID: message.author.id,
              command: 'work',
              cooldown: Date.now() + 1.44e+7
            })
            newCooldown.save()

          }
        })

    } else if (data) {

      var remaining = humanizeDuration(data.cooldown - Date.now(), { conjunction: " and ", units: ["h", "m", "s"], round: true});

      message.channel.send(`You can only use that command once every 4 hours! Your shift doesn't start for another ${remaining}!`)
    
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
