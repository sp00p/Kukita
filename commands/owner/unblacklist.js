const { MessageEmbed } = require("discord.js");
const blacklist = require('../../models/blacklist.js')

module.exports.run = (bot, message, args) => {
  if (!bot.config.owners.includes(message.author.id)) return;

  var guild = args[0];

  let blacklistEmbed = new MessageEmbed()
    .setTitle("**Blacklist**")
    .setDescription("✅ Success")
    .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")

  blacklist.findOneAndDelete({ Guild: guild}, (err, res) => {
    if (err) console.log(err);

    if(!res) {
      message.reply("this guild isn't blacklisted sir")
    } else {
      res.save().catch(err => console.log(err));
      blacklistEmbed.addField("unbanned", guild);
      message.channel.send(blacklistEmbed);
    }
  })
}

module.exports.help = {
  name: "unblacklist",
  description: "unblacklists specific guild from bot",
  arguments: "<guild id>",
  category: "Owner",
  aliases: ["unblacklist"]
};
