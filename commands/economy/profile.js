const { MessageEmbed } = require("discord.js");
const mainSchema = require("../../models/mainschema.js")

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  if (!bot.config.betatesters.includes(message.author.id)) return
  if (!bot.config.betatestingchannelid.includes(message.channel.id)) return

  let profileEmbed = new MessageEmbed()
    .setAuthor(`${message.author.username}'s Profile`, message.author.displayAvatarURL())

  mainSchema.findOne({ userID: message.author.id }, (err, res) => {
    if (err) console.log(err);

    if(!res) {
      profileEmbed.setColor("#fc0404");
      profileEmbed.addField("❌ Error", `You don't have a profile! Use ${bot.prefix}create to start an account!`);

      return message.channel.send(profileEmbed)
    } else {

      let currentLevel = Math.floor(res.currentXP / 1000);
      const progress = (res.currentXP % 1000) / 1000;
      const progressOutOf10 = Math.round(progress * 10);
      const x = "□";
      const barStr = `${'▰'.repeat(progressOutOf10)}${'▱'.repeat(10 - progressOutOf10)}`;


      profileEmbed.setDescription(`**Rank**: ${res.rank}\n**Is Voter**: ${res.isVoter}\n**Passive**: ${res.isPassive}\n**Coins**: $${res.money}\n**Level**: ${res.level}\n**XP**: ${res.currentXP}/${res.nextLevel}\n${barStr}`)
      profileEmbed.setColor("#FFFFFF")

      return message.channel.send(profileEmbed)

    }
  })
}

module.exports.help = {
  name: "profile",
  description: "sends you your stats or those of another user",
  arguments: "[user]",
  category: "Economy",
  aliases: ["profile"]
};
