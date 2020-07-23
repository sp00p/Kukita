const { MessageEmbed } = require("discord.js")
const imageAPI = require("imageapi.js")

module.exports.run = async (bot, message, args) => {

  let subreddits = [
    "comedyheaven",
    "dank",
    "meme",
    "memes"
  ]
  let subreddit = subreddits[Math.floor(Math.random() * (subreddits.length)-1)]
  let img = await imageAPI(subreddit)

  const Embed = new MessageEmbed()
    .setTitle(`Meme provided by r/${subreddit}`)
    .setURL(`https://reddit.com/r/${subreddit}`)
    .setColor("RANDOM")
    .setImage(img)
    message.channel.send(Embed)
}

module.exports.help = {
  name: "meme",
  description: "sends a random meme from a random subreddit",
  arguments: "",
  category: "Fun",
  aliases: ["meme"],
}
