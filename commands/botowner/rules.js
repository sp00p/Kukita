const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!bot.config.owners.includes(message.author.id)) return;

    let rulesEmbed = new MessageEmbed()
    .setTitle("Reaction Roles")
    .setDescription("Once you've read and agree to these rules react to gain access to the server!")
    .setColor("GREEN")
    let msgEmbed = await message.channel.send(rulesEmbed)
    msgEmbed.react('👍')

}

module.exports.help = {
  name: "rules",
  description: "",
  arguments: "",
  category: "Owner",
  aliases: ["rules"]
};
