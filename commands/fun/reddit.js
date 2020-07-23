const { MessageEmbed } = require("discord.js")
const imageAPI = require("imageapi.js")

module.exports.run = async (bot, message, args) => {

  let Subreddit = message.content.slice(bot.prefix.length+7)
  console.log(Subreddit)
  if (!Subreddit)return message.channel.send("You didn't provide a subreddit!")
  try{
    let img = await imageAPI(Subreddit)
    const Embed = new MessageEmbed()
    .setTitle(`A random image from ${Subreddit}`)
    .setColor("RANDOM")
    .setImage(img)
    message.channel.send(Embed)
  } catch (err){
    message.channel.send(err)

  }

}

module.exports.help = {
  name: "reddit",
  description: "sends a random image from the provided subreddit",
  arguments: "<subreddit>",
  category: "Fun",
  aliases: ["reddit"],
}
