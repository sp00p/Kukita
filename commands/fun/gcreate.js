const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD", "ADMINISTRATOR")) return message.channel.send("You have to have the MANAGE_GUILD or ADMINISTRATOR permission to use this command!😞")

  if (!args[0]) return message.channel.send(`Please specify the duration of your giveaway!`)
  if (!args[0].endsWith("d")&&!args[0].endsWith("h")&&!args[0].endsWith("m")&&!args[0].endsWith("s")) return message.channel.send("You didn't use the correct formatting for the duration of your giveaway!")
  if (isNaN(args[0][0])) return message.channel.send("The provided value is not a number!")
  let channel = message.mentions.channels.first()
  if (!channel) return message.channel.send("I couldn't find that channel in your guild!")
  let prize = args[2]
  if (!prize) return message.channel.send("You didn't specify a prize!")
  message.channel.send(`Giveaway created in ${channel}`)

  let durationString = ""

  if(args[0].endsWith("d")) {
    let slicedString = args[0].slice(0, -1);
    var concatString = slicedString.concat(" days")
    durationString = concatString
  } else if (args[0].endsWith("h")){
    let slicedString = args[0].slice(0, -1);
    var concatString = slicedString.concat(" hours")
    durationString = concatString
  } else if (args[0].endsWith("m")) {
    let slicedString = args[0].slice(0, -1);
    var concatString = slicedString.concat(" minutes")
    durationString = concatString
  } else if (args[0].endsWith("s")) {
    let slicedString = args[0].slice(0, -1);
    var concatString = slicedString.concat(" seconds")
    durationString = concatString
  }

  let giveawayEmbed = new MessageEmbed()
  .setTitle("🎉**New Giveaway**🎉")
  .setDescription(`Hosted by: ${message.author}\n Duration: ${durationString}\n Prize: ${prize}`)
  .setColor("#DA0707")
  let channelID = bot.channels.cache.get(channel.id)
  let msg = await channelID.send(giveawayEmbed)
  let msgID = channelID.messages.fetch(msg)
  await msg.react('🎉');

  let giveawayEndEmbed = new MessageEmbed()
  .setTitle("🎉**Giveaway Ended**🎉")
  .setColor("#00FF00")
  setTimeout(() => {

    let winner = msg.reactions.cache.get('🎉').users.cache.filter(u => !u.bot).random();
    if (!winner) return
    if (msg.reactions.cache.size <= 0) return channelID.send("No one reacted so the giveaway was canceled!")
    giveawayEndEmbed.setDescription(`${winner.username} has won the giveaway!\n\n Prize: ${prize}\n\n DM ${message.author} to claim your prize!`)
    msg.edit(giveawayEndEmbed)

  }, ms(args[0]));

}

module.exports.help = {
  name: "gcreate",
  description: "creates a giveaway",
  arguments: "<time> <channel> <prize>",
  category: "Fun",
  aliases: ["gcreate"]
}
