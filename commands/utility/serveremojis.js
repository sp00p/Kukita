const { MessageEmbed } = require('discord.js')

module.exports.run =  async (bot, message, args) => {

  let Emojis = "";
  let EmojisAnimated = "";
  let EmojiCount = 0;
  let Animated = 0;
  let OverallEmojis = 0;
  function Emoji(id) {
    return bot.emojis.cache.get(id).toString()
  }
  message.guild.emojis.cache.forEach(emoji => {
    OverallEmojis++;
    if (emoji.animated) {
      Animated++;
      EmojisAnimated += Emoji(emoji.id)
    } else {
      EmojiCount++;
      Emojis += Emoji(emoji.id)
    }
  })
  let emojiEmbed = new MessageEmbed()
    .setTitle(`**Emojis in ${message.guild.name}**`)
    .setDescription(`**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}`)
    message.channel.send(emojiEmbed)
}


module.exports.help = {
  name: "serveremojis",
  description: "displays all emojis available in the guild",
  arguments: "",
  category: "Utility",
  aliases: ["serveremojis", "emojis"]
}
