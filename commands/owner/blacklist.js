const { MessageEmbed } = require("discord.js");
const blacklist = require('../../models/blacklist.js')

module.exports.run = (bot, message, args) => {
  if (!bot.config.owners.includes(message.author.id)) return;

  var guild = args[0];

  let blacklistEmbed = new MessageEmbed()
    .setTitle("**Blacklist**")
    .setDescription("✅ Success")
    .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")

  blacklist.findOne({ Guild: guild}, (err, res) => {
    if(err) console.log(err);

    if(!res) {
      let newBlacklist = new blacklist({
        Guild: guild,
      })

      newBlacklist.save().catch(err => console.log(err));
      blacklistEmbed.addField("banned", guild);
      message.channel.send(blacklistEmbed);
    } else {
      message.reply("use unblacklist lol");
    }
  })
}

module.exports.help = {
  name: "blacklist",
  description: "blacklists specific guild from bot",
  arguments: "<guild id>",
  category: "Owner",
  aliases: ["blacklist"]
};
