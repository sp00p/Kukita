const Discord = require("discord.js");

module.exports.run = (bot, message,args) => {

  const botInfoEmbed = {
    color: '#0x0099ff',
    author: {
      name: "Kukita#6512",
      icon_url: "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png",
    },
    thumbnail: {
      url: "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png",
    },
    fields: [
      {
        color: '#0x0099ff',
        name: "**Information**",
        value: "\n**Bot Creator** - <@257663701505671169>\n\n **Current Version** - 1.0.0\n\n [Documentation](https://docs.seancornell.io/)\n\n [Bot Server Invite](https://discord.gg/UD23c9B)",
      },
    ],

  };

  message.channel.send({embed: botInfoEmbed})
}

module.exports.help = {
  name: "botinfo",
  description: "sends info about the bot",
  arguments: "",
  category: "Utility",
  aliases: ["botinfo", "binfo"]
};
