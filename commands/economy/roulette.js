const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");

module.exports.run = async (bot, message, args) => {

  if (!bot.config.betatesters.includes(message.author.id)) return
  if (!bot.config.betatestingchannelid.includes(message.channel.id)) return

  let userBet = args[0]

  if(userBet < 100) return message.channel.send("You have to bet more than $100!")

  if(args[1] !== "red" && args[1] !== "black" && args[1] !== "green") {
    var evenOdd = args[1]
    if(evenOdd !== "even" && evenOdd !== "odd") return message.channel.send("Please provide either (even) or (odd)");
  } else {
    var userColor = args[1]
  }


  let randomNumber = Math.floor(Math.random() * 100) + 1
  let randomEvenOdd = Math.floor(Math.random() * 36) + 1

  if(!userBet) return message.channel.send("Please specify an amount you'd like to bet!")

  let moneyEmbed = new MessageEmbed()
  let firstEmbed = new MessageEmbed()
  firstEmbed.setTitle("Spinning...")
  let finalEmbed = new MessageEmbed()
  finalEmbed.setTitle("Result")

  Money.findOne({ userID: message.author.id, serverID: message.guild.id}, (err, res) => {

    if (err) console.log(err);

    if(!res) {
      moneyEmbed.setTitle("Oh no!")
      moneyEmbed.setColor("#fc0404");
      moneyEmbed.addField("❌ Error", "You don't have any money in this server!");
      return message.channel.send(moneyEmbed)
    } else if (res){
      if (res.money < userBet) return message.channel.send("You don't have that much money in your account!")

      if (!evenOdd) {

        if(randomNumber < 49) {
          if (userColor === "red") {

            finalEmbed.setColor("#00FF00")
            finalEmbed.addField("Spin Result", `🔴⚫->🔴<-⚫🔴`)
            finalEmbed.addField("User Bet", userBet)
            finalEmbed.addField("User Color", userColor)
            finalEmbed.addField("Final Result", `You won $${userBet * 2}!`)
            res.money = res.money + (userBet * 2)
            res.save()

            message.channel.send(firstEmbed).then((msg) => {
              setTimeout(function(){
                msg.edit(finalEmbed);
              }, 1500);
            });
          } else {

            finalEmbed.setColor("#FF0000")
            finalEmbed.addField("Spin Result", `🔴⚫->🔴<-⚫🔴`)
            finalEmbed.addField("User Bet", userBet)
            finalEmbed.addField("User Color", userColor)
            finalEmbed.addField("Final Result", `You lost $${userBet}!`)
            res.money = res.money - userBet
            res.save()

            message.channel.send(firstEmbed).then((msg) => {
              setTimeout(function(){
                msg.edit(finalEmbed);
              }, 1500);
            });
          }
        } else if (randomNumber > 51) {
          if (userColor === "black") {

            finalEmbed.setColor("#00FF00")
            finalEmbed.addField("Spin Result", `⚫🔴->⚫<-🔴⚫`)
            finalEmbed.addField("User Bet", userBet)
            finalEmbed.addField("User Color", userColor)
            finalEmbed.addField("Final Result", `You won $${userBet * 2}!`)
            res.money = res.money + (userBet * 2)
            res.save()

            message.channel.send(firstEmbed).then((msg) => {
              setTimeout(function(){
                msg.edit(finalEmbed);
              }, 1500);
            });
          } else {

            finalEmbed.setColor("#FF0000")
            finalEmbed.addField("Spin Result", `⚫🔴->⚫<-🔴⚫`)
            finalEmbed.addField("User Bet", userBet)
            finalEmbed.addField("User Color", userColor)
            finalEmbed.addField("Final Result", `You lost $${userBet}!`)
            res.money = res.money - userBet
            res.save()

            message.channel.send(firstEmbed).then((msg) => {
              setTimeout(function(){
                msg.edit(finalEmbed);
              }, 1500);
            });
          }
        } else if (randomNumber === 50) {
          if (userColor === "green") {

            finalEmbed.setColor("#00FF00")
            finalEmbed.addField("Spin Result", `⚫🔴->🟢<-⚫🔴`)
            finalEmbed.addField("User Bet", userBet)
            finalEmbed.addField("User Color", userColor)
            finalEmbed.addField("Final Result", `You won $${userBet * 14}!`)
            res.money = res.money + (userBet * 14)
            res.save()

            message.channel.send(firstEmbed).then((msg) => {
              setTimeout(function(){
                msg.edit(finalEmbed);
              }, 1500);
            });
          } else {

            finalEmbed.setColor("#FF0000")
            finalEmbed.addField("Spin Result", `⚫🔴->🟢<-⚫🔴`)
            finalEmbed.addField("User Bet", userBet)
            finalEmbed.addField("User Color", userColor)
            finalEmbed.addField("Final Result", `You lost $${userBet}!`)
            res.money = res.money - userBet
            res.save()

            message.channel.send(firstEmbed).then((msg) => {
              setTimeout(function(){
                msg.edit(finalEmbed);
              }, 1500);
            });
          }
        }
      } else if (evenOdd) {

          if (randomEvenOdd % 2 === 0 && evenOdd === "even") {

              finalEmbed.setColor("#00FF00")
              finalEmbed.addField("Spin Result", randomEvenOdd)
              finalEmbed.addField("User Bet", userBet)
              finalEmbed.addField("User Even/Odd", evenOdd)
              finalEmbed.addField("Final Result", `You won $${userBet * 1.5}`)
              res.money = res.money + (userBet * 1.5)
              res.save()

              message.channel.send(firstEmbed).then((msg) => {
                setTimeout(function(){
                  msg.edit(finalEmbed);
                }, 1500);
              });
            } else if (randomEvenOdd % 2 !== 0 && evenOdd === "even"){

              finalEmbed.setColor("#FF0000")
              finalEmbed.addField("Spin Result", randomEvenOdd)
              finalEmbed.addField("User Bet", userBet)
              finalEmbed.addField("User Even/Odd", evenOdd)
              finalEmbed.addField("Final Result", `You lose $${userBet}`)
              res.money = res.money - userBet
              res.save()

              message.channel.send(firstEmbed).then((msg) => {
                setTimeout(function(){
                  msg.edit(finalEmbed);
                }, 1500);
              });
            } else if (randomEvenOdd % 2 === 1 && evenOdd === "odd") {

              finalEmbed.setColor("#00FF00")
              finalEmbed.addField("Spin Result", randomEvenOdd)
              finalEmbed.addField("User Bet", userBet)
              finalEmbed.addField("User Even/Odd", evenOdd)
              finalEmbed.addField("Final Result", `You won $${userBet * 1.5}`)
              res.money = res.money + (userBet * 1.5)
              res.save()


              message.channel.send(firstEmbed).then((msg) => {
                setTimeout(function(){
                  msg.edit(finalEmbed);
                }, 1500);
              });
            } else if (randomEvenOdd % 2 !== 1) {

              finalEmbed.setColor("#FF0000")
              finalEmbed.addField("Spin Result", randomEvenOdd)
              finalEmbed.addField("User Bet", userBet)
              finalEmbed.addField("User Even/Odd", evenOdd)
              finalEmbed.addField("Final Result", `You lose $${userBet}`)
              res.money = res.money - userBet
              res.save()

              message.channel.send(firstEmbed).then((msg) => {
                setTimeout(function(){
                  msg.edit(finalEmbed);
                }, 1500);
              });
            }
        }

      }

  })
}


module.exports.help = {
  name: "roulette",
  description: "lets you play roulette",
  arguments: "<bet> <color> [even/odd]",
  category: "Economy",
  aliases: ["roulette", "rl"]
};
