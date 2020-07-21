const { MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');
const Money = require('../../models/money.js')

module.exports.run = async (bot, message, args) => {

  Money.find({
    serverID: message.guild.id
  }).sort([
      ['coins', 'descending']
  ]).exec((err, res) => {
    if(err) console.log(err);

    let lbEmbed = new MessageEmbed()
      .setTitle("Server Money Leaderboard")
      .setAuthor(message.guild, message.guild.iconURL({format: "png"}))
      .setFooter("You can earn money by chatting!", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")

      if (res.length === 0) {
        lbEmbed.setColor("#fc0404");
        lbEmbed.addField("No data found", "You can earn money by chatting")
      } else if (res.length < 10) {
        lbEmbed.setColor("0x0099ff");
        for(i = 0; i < res.length; i++) {
          let member = message.guild.members.cache.get(res[i].userID) || "User Left"
          if(member === "User Left") {
            lbEmbed.addField(`${i + 1}. ${member}`, `💰: ${res[i].money}`);
          } else {
            lbEmbed.addField(`${i + 1}. ${member.user.username}`, `💰: ${res[i].money}`);
          }
        }
      } else {
        lbEmbed.setColor("0x0099ff");
        for(i = 0; i < 10; i++) {
          let member = message.guild.members.cache.get(res[i].userID) || "User Left"
          if(member === "User Left") {
            lbEmbed.addField(`${i + 1}. ${member}`, `💰: ${res[i].money}`);
          } else {
            lbEmbed.addField(`${i + 1}. ${member.user.username}`, `💰: ${res[i].money}`);
          }
      }
    }
    message.channel.send(lbEmbed);
  })
}


module.exports.help = {
  name: "leaderboard",
  description: "sends the currency leaderboard for your server",
  arguments: "",
  category: "Economy",
  aliases: ["leaderboard", "lb"]
};
