module.exports.run = async (bot, message, args) => {

  var usermsg = message.content.slice(bot.prefix.length+4)
  if (usermsg.includes("@")) return (message.channel.send("You cannot use @'s"))
  message.channel.send(usermsg)

}

module.exports.help = {
  name: "say",
  description: "makes the bot say something",
  arguments: "<message>",
  category: "Fun",
  aliases: ["say"],
}
