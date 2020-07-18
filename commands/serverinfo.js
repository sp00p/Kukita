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
      const offlineMembers = fetchedMembers.filter(member => member.presence.status === "offline");
      const serverInfoEmbed = new Discord.MessageEmbed()
        .setColor("0x0099ff")
        .setAuthor("Server Information")
        .setThumbnail(serverIcon)
        .addFields(
          {name: "**Guild Name**", value: guild.name, inline: true},
          {name: "**Owner**", value: guild.owner.user, inline: true},
          {name: "**Member Count**", value: guild.memberCount, inline: true},
          {name: "**Voice Region**", value: guild.region, inline: true},
          {name: "**Nitro Tier**", value: guild.premiumTier, inline: true},
          {name: "**Nitro Boosts**", value: guild.premiumSubscriptionCount, inline: true},
          {name: "**Verification Level**", value: guild.verificationLevel},
          {name: "**Member Prescences**", value: `🟢 Online ${onlineMembers.size}\n 🟠 Idle ${idleMembers.size}\n 🔴 Do Not Disturb ${dndMembers.size}\n ⚫ Offline ${offlineMembers.size}`, inline: true}

        )
        .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png");

        message.channel.send(serverInfoEmbed);
    })
  }
};
