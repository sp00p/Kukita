const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");

module.exports.run = async (bot, message, args) => {

  if (!bot.config.owners.includes(message.author.id)) return;

  let moneyEmbed = new MessageEmbed()

  Money.findOne({ userID: message.mentions.users.first().id }, (err, res) => {
    if (err) console.log(err);

    if(!res) {

      message.channel.send("lol this man no have account")
    } else if (res) {
      moneyEmbed.setTitle("✅ Success")
      res.money = res.money + args[1]
      res.save()
    }
  })
}

module.exports.help = {
  name: "addmoney",
  description: "adds money to specified user",
  arguments: "<user> <money>",
  category: "Owner",
  aliases: ["addmoney", "addcash"]
};
