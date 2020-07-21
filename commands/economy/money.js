const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");

module.exports.run = async (bot, message, args) => {

  let moneyEmbed = new MessageEmbed()
    .setTitle("Money")
    .setThumbnail(message.author.displayAvatarURL)

  Money.findOne({ userID: message.author.id, serverID: message.guild.id}, (err, res) => {
    if (err) console.log(err);

    if(!res) {
      moneyEmbed.setColor("#fc0404");
      moneyEmbed.addField("❌ Error", "You don't have any money in this server!");
    } else {
      moneyEmbed.setColor("0x0099ff");
      moneyEmbed.addField(res.username, res.money + " 💰")

    }

    message.channel.send(moneyEmbed);
  })
}

module.exports.help = {
  name: "money",
  description: "sends how much money you have in your guild",
  arguments: "",
  category: "Economy",
  aliases: ["money", "cash"]
};
