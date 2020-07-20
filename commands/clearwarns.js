const warns = require("../models/warn.js");
const Discord = require("discord.js");

module.exports = {
  name: "clearwarns",
  description: "clears all warns for user",
  arguments: "<user>",
  execute(message, args) {
    let member = message.mentions.users.first()
    if(!member) return message.channel.send("I couldn't find that user!")
    warns.find({ Guild: message.guild.id, User: member.id }, (err, data) => {
      if(err) console.log(err)
      warns.deleteMany({ User : member.id }, (err) => {
        if (err) console.log(err)
        let clearWarnsEmbed = new Discord.MessageEmbed()
          .setColor("0x0099ff")
          .setAuthor("Kukita#6512", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
          .setTitle("Success")
          .setDescription("User warns cleared successfully")
          .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
          message.channel.send(clearWarnsEmbed)
      })
    })
  }
}
