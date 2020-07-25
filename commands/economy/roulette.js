const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  if (!bot.config.betatesters.includes(message.author.id)) return message.channel.send("This command currently being beta tested!")

  //if (!bot.config.betatesters.includes(message.author.id)) return
  //if (!bot.config.betatestingchannelid.includes(message.channel.id)) return

  let userBet = args[0]

  if(userBet < 100) return message.channel.send("You have to bet more than $100!")


  let randomNumber = Math.floor(Math.random() * 100) + 1
  let randomEvenOdd = Math.floor(Math.random() * 36) + 1
  var color;

  if (randomEvenOdd % 2 === 0) {
    color = "🔴"
  } else if (randomEvenOdd % 3 === 0){
    color = "⚫"
  } else if (randomEvenOdd === "1") {
    color = "🟢"
  } else {
    color = "⚫"
  }

  let moneyEmbed = new MessageEmbed()
  let firstEmbed = new MessageEmbed()
  firstEmbed.setTitle("Spinning...")
  let finalEmbed = new MessageEmbed()
  finalEmbed.setTitle("Result")

  let noAccountEmbed = new MessageEmbed()
  .setTitle("Oh no!")
  .setColor("#FF0000")
  .setDescription(`You don't have an account yet! Use ${bot.prefix}createaccount to create one!`)

  Money.findOne({ userID: message.author.id}, (err, res) => {

    if (err) console.log(err);

    if(!res) {
      return message.channel.send(noAccountEmbed)
    } else if (res){
      if (res.money < userBet) return message.channel.send("You don't have that much money in your account!")

      if(args[1] !== "red" && args[1] !== "black" && args[1] !== "green") {
        var evenOdd = args[1]
        if(evenOdd !== "even" && evenOdd !== "odd") return message.channel.send("Please provide either (even) or (odd)");
      } else {
        var userColor = args[1]
      }

      if(!userBet) return message.channel.send("Please specify an amount you'd like to bet!")

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

              let moneyWon = parseInt(userBet+(userBet* 1.5))

              finalEmbed.setColor("#00FF00")
              finalEmbed.addField("Spin Result", `${color}`+randomEvenOdd)
              finalEmbed.addField("User Bet", userBet)
              finalEmbed.addField("User Even/Odd", evenOdd)
              finalEmbed.addField("Final Result", `You won $${moneyWon}`)
              res.money = res.money + moneyWon
              res.save()

              message.channel.send(firstEmbed).then((msg) => {
                setTimeout(function(){
                  msg.edit(finalEmbed);
                }, 1500);
              });
            } else if (randomEvenOdd % 2 !== 0 && evenOdd === "even"){

              finalEmbed.setColor("#FF0000")
              finalEmbed.addField("Spin Result", `${color}`+randomEvenOdd)
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

              let moneyWon = parseInt(userBet+(userBet* 1.5))

              finalEmbed.setColor("#00FF00")
              finalEmbed.addField("Spin Result", `${color}`+randomEvenOdd)
              finalEmbed.addField("User Bet", userBet)
              finalEmbed.addField("User Even/Odd", evenOdd)
              finalEmbed.addField("Final Result", `You won $${moneyWon}`)
              res.money = res.money + moneyWon
              res.save()


              message.channel.send(firstEmbed).then((msg) => {
                setTimeout(function(){
                  msg.edit(finalEmbed);
                }, 1500);
              });
            } else if (randomEvenOdd % 2 !== 1) {

              finalEmbed.setColor("#FF0000")
              finalEmbed.addField("Spin Result", `${color}`+randomEvenOdd)
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
