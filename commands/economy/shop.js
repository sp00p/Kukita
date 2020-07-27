const { MessageEmbed } = require("discord.js");
const mainSchema = require("../../models/mainschema.js")

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  if (!bot.config.betatesters.includes(message.author.id)) return
  if (!bot.config.betatestingchannelid.includes(message.channel.id)) return

  let shopEmbed = new MessageEmbed()
    .setTitle("Welcome to the shop!")
    .setColor("RANDOM")

  let shopItems = ["pencil", "knife", "sword", "gun", "honda", "toyota", "house", "lamborghini", "mansion", "skyscraper"]
  let rankArray = ["gentleman", "esquire", "knight", "baronet", "baron", "viscount", "earl", "marquess", "duke", "prince", "king", "emperor"]
  let rankPrices = ["50000", "100000", "250000", "500000", "750000", "1000000", "5000000", "10000000", "25000000", "50000000", "200000000", "1000000000"]
  let rankEmojis = ["⚪","🔴","🔵","🟤","🟣","🟢","🟡","🟠","🔺","🔻","🔸","🔷"]
  let priceArray = ["5", "40", "500", "800", "40000", "40000", "200000", "600000", "4000000", "20000000"]
  let emojiArray = ["✏️", "🔪", "🗡️", "🔫", "🚙", "🚗", "🏠", "🏎️", "🏡", "🏢"]


  function titleCase(str) {
     var splitStr = str.toLowerCase().split(' ');
     for (var i = 0; i < splitStr.length; i++) {
         // You do not need to check if i is larger than splitStr length, as your for does that for you
         // Assign it back to the array
         splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
     }
     // Directly return the joined string
     return splitStr.join(' ');
  }

  var profileEmbed = new MessageEmbed()

  mainSchema.findOne({ userID: message.author.id }, (err, res) => {
    if (err) console.log(err);

    if(!res) {
      profileEmbed.setColor("#fc0404");
      profileEmbed.addField("❌ Error", `You don't have any money! Use ${bot.prefix}create to start an account!`);

      return message.channel.send(profileEmbed)
    } else {

      if (args[0] === "ranks") {

        if (args[1] === "buy") {
          let rank = args[2].toLowerCase()
          if (!rankArray.includes(rank)) {
            return message.channel.send("That rank doesn't exist!")
          } else if (rankArray.includes(rank)) {
            let rankIndex = rankArray.indexOf(rank)
            if (res.money < rankPrices[rankIndex]) {
              return message.channel.send("You don't have that much money")
            } else if (res.money >= rankPrices[rankIndex]) {
              var rankWanted = titleCase(rank)
              if (res.rank === rankWanted) {
                return message.channel.send("You already hold that rank!")
              } else {
                res.money = res.money - rankPrices[rankIndex]
                res.rank = rankEmojis[rankIndex] + " " + rankWanted
                res.save()
                return message.channel.send(`You are now the rank of ${rankEmojis[rankIndex] + " " + rankWanted}`)
              }
            }
          }
        } else {
          for (var i = 0; i < rankArray.length; i++) {
            shopEmbed.addField(`${(rankEmojis[i]) + " " + titleCase(rankArray[i])}`, `$${rankPrices[i]}`)
            shopEmbed.setThumbnail("https://cdn.discordapp.com/attachments/715404655168978944/737069379941957733/latest.png")
          }
          message.channel.send(shopEmbed)
        }

      } else if (args[0] === "buy") {

        for (var i = 0; i < shopItems.length; i++) {
          let item = args[1].toLowerCase()
          if (!shopItems.includes(item)) {
            return message.channel.send("That item is not a valid item!")
          } else if (shopItems.includes(item)){
            let itemIndex = shopItems.indexOf(item)
            if (res.money < priceArray[itemIndex]) {
              return message.channel.send("You don't have that much money!")
            } else if (res.money >= priceArray[itemIndex]) {
              var itemWanted = titleCase(item)
              res.money = res.money - priceArray[itemIndex]
              res.inventory.push(emojiArray[itemIndex] + " " + itemWanted)
              if (res.inventory.length > 10) {
                return message.channel.send("You already own every item!")
              } else if (res.inventory.includes(emojiArray[itemIndex] + " " + itemWanted)){
                return message.channel.send("You already own that item!")
              } else {
                res.save()
                return message.channel.send(`You have successfully purchased ${emojiArray[itemIndex]+ " " + itemWanted } for $${priceArray[itemIndex]}`)
              }
            }
          }
        }
      } else {

        for (var i = 0; i < shopItems.length; i++) {
          shopEmbed.addField(`${(emojiArray[i]) + " " + titleCase(shopItems[i])}`, `$${priceArray[i]}`)
          shopEmbed.setThumbnail("https://cdn.discordapp.com/attachments/715404655168978944/737069379941957733/latest.png")
        }

        return message.channel.send(shopEmbed)
      }

    }
  })
}

module.exports.help = {
  name: "shop",
  description: "allows you to purchase items and ranks",
  arguments: "buy <item name> / ranks buy <rank name>",
  category: "Economy",
  aliases: ["shop"]
};
