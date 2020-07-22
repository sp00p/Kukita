module.exports.run = async (bot, message, args) => {

    let user = message.mentions.users.first()
    let avatar = user.displayAvatarURL()

    message.channel.send(avatar)
}

module.exports.help = {
  name: "avatar",
  description: "sends the specified user's avatar",
  arguments: "<user>",
  category: "Fun",
  aliases: ["avatar"]
}
