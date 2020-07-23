const { MessageEmbed } = require("discord.js")
const shops = require("../../models/shop.js")

module.exports.run = async (bot, message, args) => {

  if (!bot.config.owners.includes(message.author.id)) return;

  if (!message.author === message.guild.owner) return;

  let shopEmbed = new MessageEmbed()

  shops.find({ Guild: message.guild.id}, (err, data) => {
    if (err) console.log(err);

    if(!data.length) {
      shopEmbed.setColor("RANDOM");
      shopEmbed.addField("❌ Nothing here!", "The guild owner hasn't set up the shop!");
      message.channel.send(shopEmbed)
    } else if (data){

      shopEmbed.setDescription(data.map(d=>{
        return d.Items.map((w,i) =>`${i + 1} - Item: ${w.Name} Price: ${w.Price}`).join("\n")
      }))

      message.channel.send(shopEmbed)

    }
  })

}

module.exports.help = {
  name: "shop",
  description: "sends the shop for the guild",
  arguments: "",
  category: "Economy",
  aliases: ["shop"]
};
