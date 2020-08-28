module.exports.run = async (bot, message, args) => {

  let search = args[0]
  if (!search) return message.channel.send("Please provide a query for your search!");
  message.channel.send(`Here's your link: https://google.com/search?q=${search}&safe=active`)

}

module.exports.help = {
  name: "search",
  description: "sends you a google search link with your query",
  arguments: "<query>",
  category: "Fun",
  aliases: ["search"],
}
