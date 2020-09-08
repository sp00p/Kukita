const warns = require('../../models/warn.js')
const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message,args) => {
  if (!message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) return

    let member = message.mentions.users.first()

    if(member === message.author) return message.channel.send("You can't warn yourself!")

    if(!args[1]) {
      var reason = "Not Specified"
    } else {
      var reason = args.slice(1).join(" ")
    }

    var date = new Date()

    const warnEmbed = new MessageEmbed()
      .setColor("0x0099ff")
      .addFields(
        {name: "**Moderator**", value: message.author, inline: true},
        {name: "**Action**", value: 'Warn', inline: true},
        {name: "**Guild**", value: message.guild, inline: true},
        {name: "**Channel**", value: message.channel, inline: true},
        {name: "**Reason**", value: reason, inline: true},
        {name: "**Date**", value: `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`, inline: true}
      )
      .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")

    if(!member) return message.channel.send("Please specify a user!")
    warns.findOne({ Guild: message.guild.id, User: member.id}, (err, data) => {
      if(err) console.log(err)
      if(!data) {
        let newWarns = new warns({
          User: member.id,
          Guild: message.guild.id,
          Warns:[
            {
              Moderator: message.author.id,
              Reason: reason,
              Date: `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
            }
          ]
        })
        newWarns.save()
        message.channel.send("Member successfully warned!")
        member.send(warnEmbed)
      }else{
        data.Warns.unshift({
          Moderator: message.author.id,
          Reason: reason,
        })
        data.save()
        message.channel.send("Member successfully warned!")
        member.send(warnEmbed)
      }
    })
}

module.exports.help = {
  name: "warn",
  description: "warns specified user",
  arguments: "<user> [reason]",
  category: "Moderation",
  aliases: ["warn"]
};
