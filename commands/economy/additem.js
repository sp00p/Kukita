const { MessageEmbed } = require("discord.js")
const shops = require("../../models/shop.js")

module.exports.run = async (bot, message, args) => {

  if (!message.author === message.guild.owner) return;

  let addItemEmbed = new MessageEmbed()

  shops.findOne({ Guild: message.guild.id}, (err, data) => {
    if (err) console.log(err);

    if(!data) {

      let firstItem = new shops({
        Guild: message.guild.id,
        Items: [
          {
            Name: args.slice(1).join(" "),
            Price: args[0]
          }
        ]
      })
      firstItem.save()
      addItemEmbed.setTitle("**Item Added**")
      addItemEmbed.setDescription(args.slice(1).join(" "), args[0])
      message.channel.send(addItemEmbed)
    } else if (data){

      data.Items.unshift({
        Name: args.slice(1).join(" "),
        Price: args[0]
      })
      data.save()
      addItemEmbed.setTitle("**Item Added**")
      addItemEmbed.setDescription(`Name: ${args.slice(1).join(" ")} Price: ${args[0]}`)
      message.channel.send(addItemEmbed);
    }


  })

}

module.exports.help = {
  name: "additem",
  description: "adds an item to your guild's shop",
  arguments: "<price> <itemname>",
  category: "Economy",
  aliases: ["shop"]
};
