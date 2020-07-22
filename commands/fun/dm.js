module.exports.run = async (bot, message, args) => {

    let user = message.mentions.users.first()
    if(!user) return message.channel.send("You need to tell me which user to send a message to!")
    if(!args.slice(1).join(" ")) return message.channel.send("You didn't specify a message")
    user.send(`From ${message.author.username} ` + args.slice(1).join(" ")).catch(() => message.channel.send("That user could not be DM'd")).then(() => message.channel.send(`I've sent a message to ${user.tag}`))
}

module.exports.help = {
  name: "dm",
  description: "dm's the specified user",
  arguments: "<user> <message>",
  category: "Fun",
  aliases: ["dm"]
}
