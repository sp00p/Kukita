const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");

module.exports.run = async (bot, message, args) => {

  let userBet = args[0]
  let userNumber = Math.floor(Math.random() * 6) + 1
  let userNumber2 = Math.floor(Math.random() * 6) + 1
  let overUnder = args[1]
  if(!userBet) return message.channel.send("Please provide a bet amount!")
  let botNumber = Math.floor(Math.random() * 6) + 1
  let botNumber2 = Math.floor(Math.random() * 6) + 1
  let randomNumber = Math.floor(Math.random() * 12) + 1

  let userAmount = userNumber + userNumber2
  let botAmount = botNumber + botNumber2

  let diceEmbed = new MessageEmbed()
  diceEmbed.setTitle("🎲Dice🎲")
  Money.findOne({ userID: message.author.id, serverID: message.guild.id}, (err, res) => {
    if (err) console.log(err);

    if(!res) {
      diceEmbed.setColor("#fc0404");
      moneyEmbed.addField("❌ Error", "You don't have any money in this server!");
    } else if (res){
      if (res.money < userBet) return message.channel.send("You don't have that much money in your account!")
      if(!overUnder) {

        if (userAmount > botAmount) {
          diceEmbed.setColor("#00FF00")
          diceEmbed.setDescription("**Congratulations, you won!**")
          diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
          diceEmbed.addField("Bot Roll", `${botNumber} and a ${botNumber2} for a total of ${botAmount}`)
          diceEmbed.addField("Result", `You won $${userBet * 2}!`)
          message.channel.send(diceEmbed)
          res.money = res.money + (userBet * 2)
          res.save()
        } else if (userAmount < botAmount) {
          diceEmbed.setColor("#FF0000")
          diceEmbed.setDescription("**Oh no! You lost!**")
          diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
          diceEmbed.addField("Bot Roll", `${botNumber} and a ${botNumber2} for a total of ${botAmount}`)
          diceEmbed.addField("Result", `You lost $${userBet}!`)
          message.channel.send(diceEmbed)
          res.money = res.money - userBet
          res.save()
        } else if (userAmount === botAmount) {
          diceEmbed.setColor("0x0099ff")
          diceEmbed.setDescription("**Well this is awkward.**")
          diceEmbed.setDescription("**Oh no! You lost!**")
          diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
          diceEmbed.addField("Bot Roll", `${botNumber} and a ${botNumber2} for a total of ${botAmount}`)
          diceEmbed.addField("Result", `You get your $${userBet} back!`)
          message.channel.send(diceEmbed)
        }

      } else if (overUnder){
        if (overUnder === "over") {

          if (userAmount > randomNumber) {
            diceEmbed.setColor("#00FF00")
            diceEmbed.setDescription("**Congratulations, you won!**")
            diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
            diceEmbed.addField("Limit", randomNumber)
            diceEmbed.addField("Result", `You won $${userBet * 2}`)
            message.channel.send(diceEmbed)
            res.money = res.money + (userBet * 2)
            res.save()
          } else if (userAmount < randomNumber)
            diceEmbed.setColor("#FF0000")
            diceEmbed.setDescription("**Oh no! You lost!**")
            diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
            diceEmbed.addField("Limit", randomNumber)
            diceEmbed.addField("Result", `You lost $${userBet}!`)
            message.channel.send(diceEmbed)
            res.money = res.money - userBet
            res.save()
          } else if (userAmount === randomNumber) {
            diceEmbed.setColor("0x0099ff")
            diceEmbed.setDescription("**Well this is awkward.**")
            diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
            diceEmbed.addField("Limit", randomNumber)
            diceEmbed.addField("Result", `You get your $${userBet} back!`)
            message.channel.send(diceEmbed)
          }
        } else if (overUnder === "under") {

          if (userAmount < randomNumber) {
            diceEmbed.setColor("#00FF00")
            diceEmbed.setDescription("**Congratulations, you won!**")
            diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
            diceEmbed.addField("Limit", randomNumber)
            diceEmbed.addField("Result", `You won $${userBet * 2}!`)
            message.channel.send(diceEmbed)
            res.money = res.money + (userBet * 2)
            res.save()
          } else if (userAmount > randomNumber) {
            diceEmbed.setColor("#FF0000")
            diceEmbed.setDescription("**Oh no! You lost!**")
            diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
            diceEmbed.addField("Limit", randomNumber)
            diceEmbed.addField("Result", `You lost $${userBet}!`)
            message.channel.send(diceEmbed)
            res.money = res.money - userBet
            res.save()
          } else if (userAmount === randomNumber) {
            diceEmbed.setColor("0x0099ff")
            diceEmbed.setDescription("**Well this is awkward.**")
            diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of **$${userAmount}**`)
            diceEmbed.addField("Limit", randomNumber)
            diceEmbed.addField("Result", `You get your $${userBet} back!`)
            message.channel.send(diceEmbed)
          }
        }
      }
    })
}

module.exports.help = {
  name: "dice",
  description: "allows you to play dice against the bot!",
  arguments: "<bet amount> [over/under]",
  category: "Economy",
  aliases: ["dice"]
};
