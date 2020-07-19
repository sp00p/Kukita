const Discord = require("discord.js");

module.exports = {
  name: "mute",
  description: "mutes specific user",
  arguments: "<user> [reason]",
  execute(message, args) {
    if (message.member.hasPermission("MUTE_MEMBERS", "ADMINISTRATOR")) {

      let member = message.guild.member(message.mentions.users.first());
      let moderator = message.author;
      let guildname = message.guild;

      if (args[2] === "") {
        var reason = "Not Specified"
      } else {
        var reason = args[2]
      }

      const mutedEmbed = new Discord.MessageEmbed()
      .setColor("0x0099ff")
      .setAuthor("Kukita#6512", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
      .addFields(
        {name: "**Moderator**", value: moderator},
        {name: "**Action**", value: 'Mute'},
        {name: "**Guild**", value: guildname},
        {name: "**Reason**", value: reason}
      )
      .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png");

    } else {
      message.reply("You have to have the MUTE_MEMBERS or ADMINISTRATOR permission to use this command!😞");
    }
  }
}
