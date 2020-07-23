const { MessageEmbed } = require("discord.js");
const blacklistuser = require('../../models/blacklistuser.js')

module.exports.run = (bot, message, args) => {
  if (!bot.config.owners.includes(message.author.id)) return;

  var user = args[0];

  let blacklistEmbed = new MessageEmbed()
    .setTitle("**Blacklist**")
    .setDescription("✅ Success")
    .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")

  blacklistuser.findOne({ userID: user}, (err, res) => {
    if(err) console.log(err);

    if(!res) {
      let newBlacklistUser = new blacklistuser({
        userID: user,
      })

      newBlacklistUser.save().catch(err => console.log(err));
      blacklistEmbed.addField("banned", user);
      message.channel.send(blacklistEmbed);
    } else {
      message.reply("use unblacklist lol");
    }
  })
}

module.exports.help = {
  name: "blacklistuser",
  description: "blacklists specific user from bot",
  arguments: "<user id>",
  category: "Owner",
  aliases: ["bu", "blacklistuser"]
};
