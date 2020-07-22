const { MessageEmbed } = require("discord.js")

module.exports.run = (bot, message,args) => {

  const firstEmbed = new MessageEmbed()
    .setTitle("Pinging...")

  message.channel.send(firstEmbed).then((m => {
    let ping = m.createdTimestamp - message.createdTimestamp;

    let pingEmbed = new MessageEmbed()
    .setTitle("Pong!🏓")
    .setThumbnail("https://cdn.discordapp.com/emojis/723073203307806761.gif?v=1")
    .addField("__**Bot Latency**__", `${ping}ms`)
    .addField("__**API Latency**__", `${Math.round(bot.ws.ping)}ms`)
    .setTimestamp()
    .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
    m.edit(pingEmbed);
  }))
};

module.exports.help = {
  name: "ping",
  description: "gets your latency",
  arguments: "",
  category: "Utility",
  aliases: [""]
};
