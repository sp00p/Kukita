const warns = require("../../models/warn.js");
const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message,args) => {
  let member = message.mentions.users.first()
  if(!member) return message.channel.send("I couldn't find that user!")
  warns.find({ Guild: message.guild.id, User: member.id }, (err, data) => {
    if(err) console.log(err)
    if(!data.length) return message.channel.send(`${member.tag} doesn't have any warns!`)
    let warnsEmbed = new MessageEmbed()
      .setColor("0x0099ff")
      .setAuthor("Kukita#6512", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
      .setTitle(`${member.tag}'s warns in ${message.guild.name}`)
      .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
      .setDescription(data.map(d=>{
        return d.Warns.map((w,i) =>`${i} - Moderator: ${message.guild.members.cache.get(w.Moderator).user.tag} Reason: ${w.Reason}`).join("\n")
      }))
      message.channel.send(warnsEmbed)
  })
}

module.exports.help = {
  name: "warns",
  description: "displays the specified users warns",
  arguments: "<user>",
  category: "Moderation",
  aliases: ["warns"]
};
