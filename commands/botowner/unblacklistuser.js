const { MessageEmbed } = require("discord.js");
const blacklistuser = require('../../models/blacklistuser.js')

module.exports.run = (bot, message, args) => {
  if (!bot.config.owners.includes(message.author.id)) return;

  var user = args[0];

  let blacklistUserEmbed = new MessageEmbed()
    .setTitle("**Blacklist**")
    .setDescription("✅ Success")
    .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")

  blacklist.findOneAndDelete({ userID: user}, (err, res) => {
    if (err) console.log(err);

    if(!res) {
      message.reply("this user isn't blacklisted sir")
    } else {
      res.save().catch(err => console.log(err));
      blacklistUserEmbed.addField("unbanned", user);
      return message.channel.send(blacklistUserEmbed);
    }
  })
}

module.exports.help = {
  name: "unblacklistuser",
  description: "unblacklists specific user from bot",
  arguments: "<user id>",
  category: "Owner",
  aliases: ["ubu", "unblacklistuser"]
};
