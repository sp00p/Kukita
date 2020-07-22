const { MessageEmbed } = require("discord.js");
const Prefix = require("../../models/prefix.js");

module.exports.run = async (bot, message, args) => {

  if (!message.author === message.guild.owner) return;

  if(!args[0]) return message.channel.send("Please specify a prefix!")

  let prefixChangeEmbed = new MessageEmbed()
    .setTitle("✅ Success")
    .setThumbnail(message.author.displayAvatarURL)

  Prefix.findOne({ serverID: message.guild.id }, (err, data) => {
    if (err) console.log(err);

    if(!data) {

      let newPrefix = new Prefix({
        serverID: message.guild.id,
        prefix: args[0],
      })
      newPrefix.save()
      prefixChangeEmbed.addFields(
        {name: "Prefix has been changed successfully!", value: `Your new prefix is: ${args[0]}`}
      )

    } else if (data){

      data.prefix = args[0]
      data.save()

      prefixChangeEmbed.addFields(
        {name: "Prefix has been changed successfully!", value: `Your new prefix is: ${args[0]}`}
      )

    }

    message.channel.send(prefixChangeEmbed);
  })
}

module.exports.help = {
  name: "prefix",
  description: "changes your server prefix",
  arguments: "<serverprefix>",
  category: "Utility",
  aliases: ["prefix"]
};
