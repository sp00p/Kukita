const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");
const dailyCooldowns = new Map();
const humanizeDuration = require("humanize-duration");

module.exports.run = async (bot, message, args) => {

  if (!bot.config.owners.includes(message.author.id)) return;
  const dailyCooldown = dailyCooldowns.get(message.author.id);
  if (dailyCooldown) {
    const remaining = humanizeDuration(dailyCooldown - Date.now(), { conjunction: " and ", units: ["h", "m", "s"], round: true});

    return message.channel.send(`You can only use that command every once a day! You have ${remaining} to wait before you can work again!`)
    .catch(console.error);
  } else {

    const author = await message.author.id

    let moneyEmbed = new MessageEmbed()
      .setTitle("Money")
      .setThumbnail(message.author.displayAvatarURL)

    Money.findOne({ userID: message.author.id, serverID: message.guild.id}, (err, res) => {
      if (err) console.log(err);

      if(!res) {
        let newMoneyAcc = new Money({
          userID: message.author.id,
          username: author,
          serverID: message.guild.id,
          money: 100
        })
        message.channel.send("Congratulations, you have earned $100. Don't spend it all in one place!")
        cooldowns.set(message.author.id, Date.now() + 86400000);
        setTimeout(() => cooldowns.delete(message.author.id), 86400000);
      } else if (res){

        res.money = res.money + 100
        res.save()
        message.channel.send("Congratulations, you have earned $100. Don't spend it all in one place!")
        dailyCooldowns.set(message.author.id, Date.now() + 86400000);
        setTimeout(() => dailyCooldowns.delete(message.author.id), 86400000);
      }

    })
  }
}

module.exports.help = {
  name: "daily",
  description: "sends how much money you have in your guild",
  arguments: "",
  category: "Economy",
  aliases: ["daily"]
};
