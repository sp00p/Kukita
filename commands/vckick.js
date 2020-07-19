const Discord = require("discord.js");

module.exports = {
  name: "vckick",
  description: "kicks the specified user from the vc",
  arguments: "<user> [reason]",
  execute(message, args) {
    if (message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) {
      if (!message.mentions.users.first()) {
        message.channel.send("Please provide a user!")
      }
      let member = message.guild.member(message.mentions.users.first());
      let moderator = message.author;
      let guildname = message.guild;

      if (args[2] === "") {
        var reason = "Not Specified"
      } else {
        var reason = args[2];
      }

      member.voice.kick();

      const vcKickEmbed = new Discord.MessageEmbed()
      .setColor("0x0099ff")
      .setAuthor("Kukita#6512", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
      .addFields(
        {name: "**Moderator**", value: moderator},
        {name: "**Action**", value: 'VCKick'},
        {name: "**Guild**", value: guildname},
        {name: "**Reason**", value: reason}
      )
      .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png");

      member.send(vcKickEmbed)
      .catch(console.error)
    } else {
      message.reply("You have to have the KICK_MEMBERS, MANAGE_GUILD, or ADMINISTRATOR permission to use this command!😞");
    }
  }
}
