const { MessageEmbed } = require("discord.js");
const mainSchema = require("../../models/mainschema.js")

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  if (!bot.config.betatesters.includes(message.author.id)) return
  if (!bot.config.betatestingchannelid.includes(message.channel.id)) return

  let inventoryEmbed = new MessageEmbed()
    .setAuthor(`${message.author.username}'s Inventory`, message.author.displayAvatarURL())

  mainSchema.findOne({ userID: message.author.id }, (err, res) => {
    if (err) console.log(err);

    if(!res) {
      inventoryEmbed.setColor("#fc0404");
      inventoryEmbed.addField("❌ Error", `You don't have any money! Use ${bot.prefix}create to start an account!`);

      return message.channel.send(profileEmbed)
    } else if (res.inventory.length === 0) {
      inventoryEmbed.setDescription("**You don't own any items!**")
      return message.channel.send(inventoryEmbed)
    } else {
      inventoryEmbed.setDescription(`**Items owned (${res.inventory.length}/10)**\n${res.inventory.join("\n")}`)
      return message.channel.send(inventoryEmbed)
    }
  })
}

module.exports.help = {
  name: "inventory",
  description: "shows what items you have",
  arguments: "",
  category: "Economy",
  aliases: ["inventory", "inv"]
};
