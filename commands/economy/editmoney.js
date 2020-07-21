const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");

module.exports.run = async (bot, message, args) => {

  if (!message.author === message.guild.owner) return;

  let moneyEmbed = new MessageEmbed()
    .setTitle("✅ Success")

  Money.findOne({ userID: message.mentions.users.first().id, serverID: message.guild.id}, (err, data) => {
    if (err) console.log(err);

    if(!data) {
      let newMoney = new Money({
        userID: message.mentions.users.first().id,
        username: message.mentions.users.first().username,
        serverID: message.guild.id,
        money: args[1]
      })
      newMoney.save()
    } else if (data) {
      message.channel.send("Querying database...")
      data.money = args[1]
      data.save()
    }

    message.channel.send(moneyEmbed);
  })
}

module.exports.help = {
  name: "editmoney",
  description: "edits the specific user's money",
  arguments: "<user> <money>",
  category: "Economy",
  aliases: ["editmoney", "editcash"]
};
