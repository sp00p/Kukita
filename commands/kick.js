const Discord = require('discord.js')

module.exports = {
  name: 'kick',
  description: 'kicks a specified user',
  arguments: '<user> [reason]',
  execute(message, member, guildname, moderator, reason) {

    const kickEmbed = new Discord.MessageEmbed()
      .setColor('0x0099ff')
      .setAuthor('Kukita#6512', 'https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png')
      .addFields(
        {name: '**Moderator**', value: moderator},
        {name: '**Action**', value: 'Kick'},
        {name: '**Reason**', value: reason},
      )
      .setFooter('Kukita Bot', 'https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png');

    member.send(kickEmbed).then(() => {
      member.kick().then((member) => {
        message.channel.send(":slight_smile: " + member.displayName + " has been kicked!");
      })
    })
  }
}
