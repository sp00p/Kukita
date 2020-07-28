const { MessageEmbed } = require("discord.js");
const mainSchema = require('../../models/mainschema.js')

module.exports.run = async (bot, message, args) => {

    //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

    //if (!bot.config.betatesters.includes(message.author.id)) return
    //if (!bot.config.betatestingchannelid.includes(message.channel.id)) return

    if(message.mentions.users.first().bot) return message.channel.send("Bot's can't recieve money!")
    if(message.mentions.users.first() === message.author) return message.channel.send("You can't pay yourself!")

    let noAccountEmbed = new MessageEmbed()
    .setTitle("Oh no!")
    .setColor("#FF0000")
    .setDescription(`You don't have an account yet! Use ${bot.prefix}createaccount to create one!`)

    noAccountMentionedUserEmbed = new MessageEmbed()
    .setTitle("Oh no!")
    .setColor("#FF0000")
    .setDescription(`That user doesn't have an account yet! They can use ${bot.prefix}create to create one!`)

    mainSchema.findOne({ userID: message.mentions.users.first().id}, (err, data) => {
      if (err) console.log(err);

      var intRegex = /^\d+$/;

      if(!data) {

        return message.channel.send(noAccountMentionedUserEmbed)

    } else if (data){

      mainSchema.findOne({ userID: message.author.id }, (err, authorData) => {
        if (err) console.log(err);

        if(!authorData) {
          return message.channel.send(noAccountEmbed)
        } else if (authorData) {
          if (!args[1]) {
            return message.reply("Please specify how much you'd like to give to this user!")
          } else if (authorData.money < args[1]) {
            return message.reply("You don't have that many coins to give!")
          } else if (args[1] <= 0) {
            return message.reply("Please enter a number greater than 0!")
          } else if (!intRegex.test(args[1])) {
            return message.reply("Please provide a number!")
          } else {
            authorData.money = authorData.money - args[1];
            data.money = data.money + args[1];
            data.save()
            authorData.save()
            message.channel.send(`Successfully paid ${message.mentions.users.first()} ${args[1]} coins!`)
          }
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
