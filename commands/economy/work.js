const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");
const humanizeDuration = require("humanize-duration");
const cooldowns = new Map();

module.exports.run = async (bot, message, args) => {

  const cooldown = cooldowns.get(message.author.id);
  if (cooldown) {
    const remaining = humanizeDuration(cooldown - Date.now(), { conjunction: " and ", units: ["h", "m", "s"], round: true});

    return message.channel.send(`You can only use that command every 4 hours! You have ${remaining} to wait before you can work again!`)
    .catch(console.error);
  } else {

    let moneyMade = Math.floor(Math.random() * 50) + 1

    let workEmbed = new MessageEmbed()
      .setTitle("Shift over!")
      .setDescription(`You worked for ${Math.floor(Math.random() * 6) + 1} hours and made $${moneyMade}`)
      .setColor("RANDOM")

      Money.findOne({ userID: message.author.id, serverID: message.guild.id}, (err, data) => {
        if (err) console.log(err);

        if(!data) {
          let newMoneyAcc = new Money({
            userID: message.author.id,
            username: message.author.username,
            serverID: message.guild.id,
            money: moneyMade
          })

          newMoneyAcc.save()

          cooldowns.set(message.author.id, Date.now() + 1.44e+7);
          setTimeout(() => cooldowns.delete(message.author.id), 1.44e+7);
          
          message.channel.send(workEmbed)
        } else {

          data.money = data.money + moneyMade;
          data.save()
          message.channel.send(workEmbed)

          cooldowns.set(message.author.id, Date.now() + 1.44e+7);
          setTimeout(() => cooldowns.delete(message.author.id), 1.44e+7);

        }
      })
    }
}

module.exports.help = {
  name: "work",
  description: "allows you to work for money",
  arguments: "",
  category: "Economy",
  aliases: ["work"]
};
