const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message,args) => {
  if (!message.member.hasPermission("MUTE_MEMBERS", "ADMINISTRATOR")) return

    let member = message.guild.member(message.mentions.users.first());
    let moderator = message.author;
    let guildname = message.guild;

    if (args[2] === "") {
      var reason = "Not Specified"
    } else {
      var reason = args[2]
    }

    const mutedEmbed = new MessageEmbed()
    .setColor("0x0099ff")
    .setAuthor("Kukita#6512", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
    .addFields(
      {name: "**Moderator**", value: moderator},
      {name: "**Action**", value: 'Mute'},
      {name: "**Guild**", value: guildname},
      {name: "**Reason**", value: reason}
    )
    .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png");

    var mutedRole = message.guild.roles.cache.find(role => role.name === "Muted")
    member.roles.add(mutedRole);

    member.send(mutedEmbed)

}

module.exports.help = {
  name: "mute",
  description: "mutes specific user",
  arguments: "<user> [reason]",
  category: "Moderation",
  aliases: ["mute"]
};
