const warns = require('../../models/warn.js')
const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message,args) => {
  if (message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) {
    if(args[2] === "") {
      var reason = "Not Specified"
    } else {
      var reason = args[2]
    }

    let member = message.mentions.users.first()

    const warnEmbed = new MessageEmbed()
      .setColor("0x0099ff")
      .setAuthor("Kukita#6512", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
      .addFields(
        {name: "**Moderator**", value: message.author},
        {name: "**Action**", value: 'Warn'},
        {name: "**Guild**", value: message.guild},
        {name: "**Channel**", value: message.channel},
        {name: "**Reason**", value: reason}
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
              Reason: reason
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
  } else {
    message.reply("You have to have the KICK_MEMBERS or ADMINISTRATOR permission to use this command!😞");
  }
}

module.exports.help = {
  name: "warn",
  description: "warns specified user",
  arguments: "<user> [reason]",
  category: "Moderation",
  aliases: [""]
};
