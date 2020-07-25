const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  if (!bot.config.betatesters.includes(message.author.id)) return message.channel.send("This command currently being beta tested!")

  Money.findOne({userID: message.author.id}, (err, data) => {

    if (data) {

      let alreadyHasAccount = new MessageEmbed()
      .setTitle("Oh no!")
      .setColor("#FF0000")
      .setDescription("You already have an account!")

      return message.channel.send(alreadyHasAccount)


    } else if (!data) {

      let newAccount = new Money({
        userID: message.author.id,
        username: message.author.username,
        money: 0
      })

      newAccount.save()

      let createdAccountEmbed = new MessageEmbed()
      .setTitle("Success!")
      .setColor("#00FF00")
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription("Account successfully created!")

      return message.channel.send(createdAccountEmbed)
    }

  })
}

module.exports.help = {
  name: "createaccount",
  description: "sends how much money you have in your guild",
  arguments: "",
  category: "Economy",
  aliases: ["createaccount", "create"]
};
