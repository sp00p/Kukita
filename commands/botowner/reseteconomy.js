const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");

module.exports.run = async (bot, message, args) => {
  if (!bot.config.owners.includes(message.author.id)) return;



  let moneyDeleteEmbed = new MessageEmbed()
    .setTitle("✅ Success")
    .setThumbnail(message.author.displayAvatarURL)

  var guild = args[0]

  Money.deleteMany({ serverID: guild}, (err, res) => {
    if (err) console.log(err);

    if(!res) {
      moneyDeleteEmbed.setColor("#fc0404");
      moneyDeleteEmbed.addField("❌ Error", "Data could not be deleted!", "lol they dont have money xdddd");
      message.channel.send(moneyDeleteEmbed);
    } else {
      moneyDeleteEmbed.setColor("#00FF00");
      moneyDeleteEmbed.addField(`${guild}'s data expuged!`, "lol they money gone" )
      message.channel.send(moneyDeleteEmbed);

    }


  })
}

module.exports.help = {
  name: "reseteconomy",
  description: "resets the specified guild's economy",
  arguments: "",
  category: "Owner",
  aliases: ["reseteconomy"]
};
