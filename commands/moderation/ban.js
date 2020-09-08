const Discord = require("discord.js");

module.exports.run = (bot, message,args) => {
  if(!message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")) return

    if (args[1] === "") {
      var reason = "Not Specified"
    } else {
      var reason = args.slice(1).join(" ")
    }

    let member = message.guild.member(message.mentions.users.first());
    let moderator = message.author;
    let guildname = message.guild;

    var date = new Date()

    const banEmbed = new Discord.MessageEmbed()
      .setColor("0x0099ff")
      .addFields(
        {name: "**Moderator**", value: message.author, inline: true},
        {name: "**Action**", value: 'Ban', inline: true},
        {name: "**Guild**", value: message.guild, inline: true},
        {name: "**Channel**", value: message.channel, inline: true},
        {name: "**Reason**", value: reason, inline: true},
        {name: "**Date**", value: `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`, inline: true}
      )
      .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png");

    member.send(banEmbed).then(() => {
      member.ban().then((member) => {
        message.channel.send(":slight_smile: " + member.displayName + " has been banned!");
      });
    });
};

module.exports.help = {
  name: "ban",
  description: "bans a specified user",
  arguments: "<user> [reason]",
  category: "Moderation",
  aliases: ["ban"]
};
