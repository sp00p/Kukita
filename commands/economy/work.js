const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");

module.exports.run = async (bot, message, args) => {

  let moneyMade = Math.floor(Math.random() * 50) + 1

  let workEmbed = new MessageEmbed()
    .setTitle(`You worked for ${Math.floor(Math.random() * 6) + 1  } and made $${moneyMade}`)
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
