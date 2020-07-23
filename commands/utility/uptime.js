const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message,args) => {
  function duration(ms) {
    const sec = Math.floor((ms / 1000) % 60).toString();
    const min = Math.floor((ms / (1000 * 60)) % 60).toString();
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
    const uptimeEmbed = new MessageEmbed()
      .setColor("#0x0099ff")
      .setAuthor("Kukita#6512", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
      .addFields(
        {name: "__**Current Uptime**__", value: `\n${days.padStart(1, "0")} days ${hrs.padStart(2, "0")} hours, ${min.padStart(2, "0")} minutes, ${sec.padStart(2, "0")} seconds`}
      )
      message.channel.send(uptimeEmbed);
    return;
  }
  duration(bot.uptime);
};

module.exports.help = {
  name: "uptime",
  description: "sends the bots current uptime",
  arguments: "",
  category: "Utility",
  aliases: ["uptime"]
};
