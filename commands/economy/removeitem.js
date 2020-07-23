const { MessageEmbed } = require("discord.js")
const shops = require("../../models/shop.js")

module.exports.run = async (bot, message, args) => {

  if (!message.author === message.guild.owner) return;

  let removeItemEmbed = new MessageEmbed()

  let itemName = args.slice(0).join(" ")

  shops.findOne({ Guild: message.guild.id }, (err, data) => {
    if (err) console.log(err);

    console.log(itemName)

    if(!data) {

      return message.channel.send("You haven't set up your shop!")

    } else if (data) {

      data.update({$pull: {Name: itemName}})

    }


  })

}

module.exports.help = {
  name: "removeitem (not working atm)",
  description: "removes an item from your guild's shop",
  arguments: "<item name>",
  category: "Economy",
  aliases: ["shop"]
};
