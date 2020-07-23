module.exports.run = async (bot, message, args) => {

  const usermsg = message.content.split(bot.prefix.length+4)
  message.channel.send(usermsg)

}

module.exports.help = {
  name: "say",
  description: "makes the bot say something",
  arguments: "<message>",
  category: "Fun",
  aliases: ["say"],
}
