const { MessageEmbed } = require("discord.js");
const mainSchema = require("../../models/mainschema.js")

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  if (!bot.config.betatesters.includes(message.author.id)) return 
  if (!bot.config.betatestingchannelid.includes(message.channel.id)) return

  let moneyEmbed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())

  mainSchema.findOne({ userID: message.author.id }, (err, res) => {
    if (err) console.log(err);

    if(!res) {
      moneyEmbed.setColor("#fc0404");
      moneyEmbed.addField("❌ Error", `You don't have any money! Use ${bot.prefix}createaccount to start an account!`);
    } else {
      moneyEmbed.setColor("0x0099ff");
      moneyEmbed.setTitle("$"+res.money)

    }

    message.channel.send(moneyEmbed);
  })
}

module.exports.help = {
  name: "balance",
  description: "sends how much money you have in your guild",
  arguments: "",
  category: "Economy",
  aliases: ["balance", "bal"]
};
