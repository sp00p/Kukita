const { MessageEmbed } = require("discord.js")

module.exports.run = async (bot, message, args) => {

  let question = message.content.replace(".8ball", "")
  if(!question){
    return message.reply("You have to ask a question!")
  } else {
    let responses = [
      "As I see it, yes.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don’t count on it.",
      "It is certain.",
      "It is decidedly so.",
      "Most likely.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Reply hazy, try again.",
      "Signs point to yes.",
      "Very doubtful.",
      "Without a doubt.",
      "Yes.",
      "Yes - definetly.",
      "You may rely on it.",
    ]
    let Response = responses[Math.floor(Math.random() * (responses.length)-1)]
    let ballEmbed = new MessageEmbed()
      .setTitle("🎱8Ball🎱")
      .setColor("RANDOM")
      .setDescription(Response)

    message.channel.send(ballEmbed)
  }

}

module.exports.help = {
  name: "8ball",
  description: "sends you answers to your questions",
  arguments: "<message>",
  category: "Fun",
  aliases: ["8ball"]
}
