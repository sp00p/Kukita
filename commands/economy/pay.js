const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");

module.exports.run = async (bot, message, args) => {

    if(message.mentions.users.first().id === bot.id) return
    if(message.mentions.users.first() === message.author) return message.channel.send("You can't pay yourself!")

    Money.findOne({ userID: message.mentions.users.first().id, serverID: message.guild.id}, (err, data) => {
      if (err) console.log(err);

      var intRegex = /^\d+$/;

      if(!data) {
        let newAccount = new Money({
          userID: message.mentions.users.first().id,
          username: message.mentions.users.first().username,
          serverID: message.guild.id,
          money: 0
        })

        Money.findOne({ userID: message.author.id, serverID: message.guild.id}, (err, authorData) => {
          if (err) console.log(err);

          if(!authorData) {
            return message.reply("Please specify how much you'd like to give to this user!")
          } else if (!args[1]) {
            return message.reply("Please provide a number!")
          } else if (authorData.money < args[1]) {
            return message.reply("You don't have that much money to give!")
          } else if (args[1] <= 0) {
            return message.reply("Please enter a number greater than 0!")
          } else if (!intRegex.test(args[1])) {
            return message.reply("Please provide a number!")
          } else {
            authorData.money = authorData.money - args[1];
            newAccount.money = newAccount.money + args[1];
            newAccount.save()
            authorData.save()
            message.channel.send(`Successfully paid ${message.mentions.users.first()} $${args[1]}!`)
          }
      })
    } else if (data){

      Money.findOne({ userID: message.author.id, serverID: message.guild.id}, (err, authorData) => {
        if (err) console.log(err);

        if(!authorData) {
          return message.reply("You don't have any money to give!")
        } else if (!args[1]) {
          return message.reply("Please specify how much you'd like to give to this user!")
        } else if (authorData.money < args[1]) {
          return message.reply("You don't have that much money to give!")
        } else if (args[1] <= 0) {
          return message.reply("Please enter a number greater than 0!")
        } else if (!intRegex.test(args[1])) {
          return message.reply("Please provide a number!")
        } else {
          authorData.money = authorData.money - args[1];
          data.money = data.money + args[1];
          data.save()
          authorData.save()
          message.channel.send(`Successfully paid ${message.mentions.users.first()} $${args[1]}!`)
        }
      })
    }
  })
}

module.exports.help = {
  name: "pay",
  description: "pays the specified user",
  arguments: "<user> <amount>",
  category: "Economy",
  aliases: ["pay"]
};
