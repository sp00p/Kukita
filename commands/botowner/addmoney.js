const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");

module.exports.run = async (bot, message, args) => {

  if (!bot.config.owners.includes(message.author.id)) return;

  let moneyEmbed = new MessageEmbed()
    .setTitle("✅ Success")

  Money.findOne({ userID: args[0], serverID: args[2]}, (err, res) => {
    if (err) console.log(err);

    if(!res) {
      let newMoney = new Money({
        userID: args[0],
        username: args[1],
        serverID: args[2],
        money: args[3]
      })
      newMoney.save()
    }

    message.channel.send(moneyEmbed);
  })
}

module.exports.help = {
  name: "addmoney",
  description: "adds money to specified user",
  arguments: "<userID> <username> <serverID> <money>",
  category: "Economy",
  aliases: ["addmoney", "addcash"]
};
