const { MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');
const mainSchema = require('../../models/mainschema.js')

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  if (!bot.config.betatesters.includes(message.author.id))
  if (!bot.config.betatestingchannelid.includes(message.channel.id)) return



  mainSchema.find({
  }).sort({
      money: -1
  }).exec((err, res) => {
    if(err) console.log(err);

    let lbEmbed = new MessageEmbed()
      .setAuthor("Currency Leaderboard")
      .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")

      if (res.length === 0) {
        lbEmbed.setColor("#fc0404");
        lbEmbed.addField("No data found", "No one has any money yet!")
      } else if (res.length < 10) {
        lbEmbed.setColor("0x0099ff");
        for(i = 0; i < res.length; i++) {
          lbEmbed.addField(`${i + 1}. ${res[i].username}`, `💰: ${res[i].money}\n⭐Rank: ${res[i].rank}\n📊 Level: ${res[i].level}`);
        }
      } else {
        lbEmbed.setColor("0x0099ff");
        for(i = 0; i < 10; i++) {
          lbEmbed.addField(`${i + 1}. ${res[i].username}`, `💰: ${res[i].money}\n📊 Level: ${res[i].level}`);
          }
      }
    message.channel.send(lbEmbed);
  })
}


module.exports.help = {
  name: "leaderboard",
  description: "sends the leaderboard of the people with the most money on the bot",
  arguments: "",
  category: "Economy",
  aliases: ["leaderboard", "lb"]
};
