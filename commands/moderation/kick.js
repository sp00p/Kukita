const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message,args) => {
  if (!message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) return
    let member = message.guild.member(message.mentions.users.first());
    let moderator = message.author;
    let guildname = message.guild;

    if (!args[1]) {
      var reason = "Not Specified"
    } else {
      var reason = args.slice(1).join(" ")
    }

    var date = new Date()

  const kickEmbed = new MessageEmbed()
    .setColor("0x0099ff")
    .setAuthor("Kukita#6512", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
    .addFields(
      {name: "**Moderator**", value: message.author, inline: true},
      {name: "**Action**", value: 'Kick', inline: true},
      {name: "**Guild**", value: message.guild, inline: true},
      {name: "**Channel**", value: message.channel, inline: true},
      {name: "**Reason**", value: reason, inline: true},
      {name: "**Date**", value: `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`, inline: true}
    )
    .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png");

  member.send(kickEmbed).then(() => {
    member.kick().then((member) => {
      message.channel.send(":slight_smile: " + member.displayName + " has been kicked!");
    });
  });
};

module.exports.help = {
  name: "kick",
  description: "kicks a specified user",
  arguments: "<user> [reason]",
  category: "Moderation",
  aliases: ["kick"]
};
