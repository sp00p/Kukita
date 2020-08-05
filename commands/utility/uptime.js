const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message,args) => {
  let totalSeconds = (bot.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400).toString();
  totalSeconds %= 86400;
  let hours = Math.floor(totalSeconds / 3600).toString();
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60).toString();
  let seconds = Math.floor(totalSeconds % 60).toString();
  const uptimeEmbed = new MessageEmbed()
    .setColor("#0x0099ff")
    .setAuthor("Kukita#6512", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
    .addFields(
      {name: "__**Current Uptime**__", value: `\n${days.padStart(1, "0")} days ${hours.padStart(2, "0")} hours, ${minutes.padStart(2, "0")} minutes, ${seconds.padStart(2, "0")} seconds`}
    )
    message.channel.send(uptimeEmbed);
  return;
};

module.exports.help = {
  name: "uptime",
  description: "sends the bots current uptime",
  arguments: "",
  category: "Utility",
  aliases: ["uptime"]
};
