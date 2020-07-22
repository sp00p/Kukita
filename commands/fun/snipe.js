const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const snipes = bot.snipes.get(message.channel.id) || [];
  const msg = snipes[args[0]-1||0]
  if(!msg) return message.channel.send("There are no messages to snipe in this channel!")
  const Embed = new MessageEmbed()
  .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true, size: 256}))
  .setColor("RANDOM")
  .setDescription(msg.content)
  .setFooter(`Date: ${msg.date} | ${args[0]||1}/${snipes.length}`)
  if(msg.attachment) Embed.setImage(msg.attachment)
  message.channel.send(Embed)
}

module.exports.help = {
  name: "snipe",
  description: "snipes the last deleted message in the channel",
  arguments: "",
  category: "Fun",
  aliases: ["snipe"],
}
