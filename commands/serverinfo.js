const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "sends infomation about the guild you\'re in",
  arguments: "none",
  execute(message, guild, serverIcon) {
    
    message.guild.members.fetch().then(fetchedMembers => {
      const onlineMembers = fetchedMembers.filter(member => member.presence.status === "online");
      const idleMembers = fetchedMembers.filter(member => member.presence.status === "idle");
      const dndMembers = fetchedMembers.filter(member => member.presence.status === "dnd");
    })

    const serverInfoEmbed = new Discord.MessageEmbed()
      .setColor("0x0099ff")
      .setAuthor("Server Information")
      .setThumbnail(serverIcon)
      .addFields(
        {name: "**Owner**", value: guild.owner.user.username, inline: true},
        {name: "**Member Count**", value: guild.memberCount, inline: true},
        {name: "**Voice Region**", value: guild.region, inline: true},
        {name: "**Nitro Tier**", value: guild.premiumTier, inline: true},
        {name: "**Nitro Boosts**", value: guild.premiumSubscriptionCount, inline: true},
        {name: "**Verification Level**", value: guild.verificationLevel},
        {name: "**Member Prescences**", value: `🟢 Online ${onlineMembers}\n 🟠 Idle ${idleMembers}\n 🔴 Do Not Disturb ${dndMembers}`, inline: true}

      )
      .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png");

      message.channel.send(serverInfoEmbed);
  }
};
