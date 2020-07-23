const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");
const humanizeDuration = require("humanize-duration", { units: ['m'], round: true });
const cooldowns = new Map();

module.exports.run = async (bot, message, args) => {

  const cooldown = cooldowns.get(message.author.id);
  if (cooldown) {
    const remanining = humanizeDuration(cooldown - Date.now());

    return message.channel.send(`You can only use that command every 4 hours! You have ${remaining} to wait before you can work again!`)
    .catch(console.error);
  }

  let moneyMade = Math.floor(Math.random() * 50) + 1

  let workEmbed = new MessageEmbed()
    .setTitle("Shift over!")
    .setDescription(`You worked for ${Math.floor(Math.random() * 6) + 1} hours and made $${moneyMade}`)
    .setColor("RANDOM")

    Money.findOne({ userID: message.author.id, serverID: message.guild.id}, (err, data) => {
      if (err) console.log(err);

      if(!data) {
        moneyEmbed.setColor("#fc0404");
        moneyEmbed.addField("❌ Error", "You don't have an account on this server!");
      } else {

        data.money = data.money + moneyMade;
        data.save()
        message.channel.send(workEmbed)

        cooldowns.set(message.author.id, Date.now() + 1.44e+7);
        setTimeout(() => cooldowns.delete(message.author.id), 1.44e+7);

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
