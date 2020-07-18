const Discord = require("discord.js");

module.exports = {
  name: "botinfo",
  description: "sends info about the bot",
  arguments: "none",
  execute(message) {

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
            value: "\n**Bot Creator** - <@257663701505671169>\n\n **Current Version** - 0.0.1\n\n [Github Repository](https://github.com/sp00p/Kukita)\n\n[Bot Server Invite](https://discord.gg/UD23c9B)\n\n[Found a bug?](https://github.com/sp00p/Kukita/issues)",
          },
        ],

      };

      message.channel.send({embed: botInfoEmbed})
  }



}
