const { MessageEmbed } = require("discord.js");
const mainSchema = require("../../models/mainschema.js")
const humanizeDuration = require('humanize-duration')

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  if (!bot.config.betatesters.includes(message.author.id)) return
  if (!bot.config.betatestingchannelid.includes(message.channel.id)) return

  let userBet = args[0]
  userBet = Math.round(userBet)

  if (isNaN(userBet)) {
    return message.channel.send("You need to bet a number!")
  }

  let userNumber = Math.floor(Math.random() * 6) + 1
  let userNumber2 = Math.floor(Math.random() * 6) + 1
  let overUnder = args[1]
  if(!userBet) return message.channel.send("Please provide a bet amount!")
  let botNumber = Math.floor(Math.random() * 6) + 1
  let botNumber2 = Math.floor(Math.random() * 6) + 1
  let randomNumber = Math.floor(Math.random() * 12) + 1

  if(userBet < 100) return message.channel.send("You have to bet more than $100!")

  let userAmount = userNumber + userNumber2
  let botAmount = botNumber + botNumber2

  let noAccountEmbed = new MessageEmbed()
  .setTitle("Oh no!")
  .setColor("#FF0000")
  .setDescription(`You don't have an account yet! Use ${bot.prefix}create to create one!`)

  let moneyEmbed = new MessageEmbed()
  let diceEmbed = new MessageEmbed()
  let firstEmbed = new MessageEmbed()
  firstEmbed.setTitle("🎲Rolling Dice...🎲")
  diceEmbed.setTitle("🎲Result🎲")
  mainSchema.findOne({ userID: message.author.id}, (err, res) => {
    if (err) console.log(err);

    if(!res) {

      return message.channel.send(noAccountEmbed)

    } else if (res){

      if (res.diceCooldown < Date.now()) {
        if (res.money < userBet) return message.channel.send("You don't have that much money in your account!")
        if(!overUnder) {

          if (userAmount > botAmount) {

            diceEmbed.setColor("#00FF00")
            diceEmbed.setDescription("**Congratulations, you won!**")
            diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
            diceEmbed.addField("Bot Roll", `${botNumber} and a ${botNumber2} for a total of ${botAmount}`)
            diceEmbed.addField("Result", `You won $${userBet * 2}!`)

            res.money = res.money + userBet*2
            res.currentXP = res.currentXP + 100
            res.diceCooldown = Date.now() + 30000

            if (res.currentXP >= res.nextLevel) {
              let overflow = res.currentXP - res.nextLevel
              let currentNL = res.nextLevel
              res.currentXP = overflow
              res.nextLevel = Math.round(currentNL + 1000)
              res.level = res.level + 1
              diceEmbed.addField(`Congratulations! You leveled up! You are now level ${res.level}`)
              res.save()
            } else if (res.currentXP < res.nextLevel){
              diceEmbed.addField("You have recieved 100 XP")
              res.save()
            }

            message.channel.send(firstEmbed).then((msg) => {
              setTimeout(function(){
                msg.edit(diceEmbed);
              }, 1500);
            });
          } else if (userAmount < botAmount) {

            diceEmbed.setColor("#FF0000")
            diceEmbed.setDescription("**Oh no! You lost!**")
            diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
            diceEmbed.addField("Bot Roll", `${botNumber} and a ${botNumber2} for a total of ${botAmount}`)
            diceEmbed.addField("Result", `You lost $${userBet}!`)

            res.money = res.money - userBet
            res.currentXP = res.currentXP + 50
            res.diceCooldown = Date.now() + 30000

            if (res.currentXP >= res.nextLevel) {
              let overflow = res.currentXP - res.nextLevel
              let currentNL = res.nextLevel
              res.currentXP = overflow
              res.nextLevel = Math.round(currentNL + 1000)
              res.level = res.level + 1
              diceEmbed.addField(`Congratulations! You leveled up! You are now level ${res.level}`)
              res.save()
            } else if (res.currentXP < res.nextLevel){
              diceEmbed.addField("You have recieved 50 XP")
              res.save()
            }

            message.channel.send(firstEmbed).then((msg) => {
              setTimeout(function(){
                msg.edit(diceEmbed);
              }, 1500);
            });

          } else if (userAmount === botAmount) {
            diceEmbed.setColor("0x0099ff")
            diceEmbed.setDescription("**Well this is awkward.**")
            diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
            diceEmbed.addField("Bot Roll", `${botNumber} and a ${botNumber2} for a total of ${botAmount}`)
            diceEmbed.addField("Result", `You get your $${userBet} back!`)

            message.channel.send(firstEmbed).then((msg) => {
              setTimeout(function(){
                msg.edit(diceEmbed);
              }, 1500);
            });
          }

        } else if (overUnder){
          if (overUnder === "over") {

            if (userAmount > randomNumber) {
              diceEmbed.setColor("#00FF00")
              diceEmbed.setDescription("**Congratulations, you won!**")
              diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
              diceEmbed.addField("Limit", randomNumber)
              diceEmbed.addField("Result", `You won $${userBet * 2}`)

              res.money = res.money + userBet*2
              res.currentXP = res.currentXP + 100
              res.diceCooldown = Date.now() + 30000

              if (res.currentXP >= res.nextLevel) {
                let overflow = res.currentXP - res.nextLevel
                let currentNL = res.nextLevel
                res.currentXP = overflow
                res.nextLevel = Math.round(currentNL + 1000)
                res.level = res.level + 1
                diceEmbed.addField(`Congratulations! You leveled up! You are now level ${res.level}`)
                res.save()
              } else if (res.currentXP < res.nextLevel){
                diceEmbed.addField("You have recieved 100 XP")
                res.save()
              }

              message.channel.send(firstEmbed).then((msg) => {
                setTimeout(function(){
                  msg.edit(diceEmbed);
                }, 1500);
              });

            } else if (userAmount < randomNumber) {
              diceEmbed.setColor("#FF0000")
              diceEmbed.setDescription("**Oh no! You lost!**")
              diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
              diceEmbed.addField("Limit", randomNumber)
              diceEmbed.addField("Result", `You lost $${userBet}!`)

              res.money = res.money - userBet
              res.currentXP = res.currentXP + 50
              res.diceCooldown = Date.now() + 30000

              if (res.currentXP >= res.nextLevel) {
                let overflow = res.currentXP - res.nextLevel
                let currentNL = res.nextLevel
                res.currentXP = overflow
                res.nextLevel = Math.round(currentNL + 1000)
                res.level = res.level + 1
                diceEmbed.addField(`Congratulations! You leveled up! You are now level ${res.level}`)
                res.save()
              } else if (res.currentXP < res.nextLevel){
                diceEmbed.addField("You have recieved 50 XP")
                res.save()
              }

              message.channel.send(firstEmbed).then((msg) => {
                setTimeout(function(){
                  msg.edit(diceEmbed);
                }, 1500);
              });
            } else if (userAmount === randomNumber) {
              diceEmbed.setColor("0x0099ff")
              diceEmbed.setDescription("**Well this is awkward.**")
              diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
              diceEmbed.addField("Limit", randomNumber)
              diceEmbed.addField("Result", `You get your $${userBet} back!`)

              message.channel.send(firstEmbed).then((msg) => {
                setTimeout(function(){
                  msg.edit(diceEmbed);
                }, 1500);
              });
            }
          } else if (overUnder === "under") {

            if (userAmount < randomNumber) {
              diceEmbed.setColor("#00FF00")
              diceEmbed.setDescription("**Congratulations, you won!**")
              diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
              diceEmbed.addField("Limit", randomNumber)
              diceEmbed.addField("Result", `You won $${userBet * 2}!`)

              res.money = res.money + userBet*2
              res.currentXP = res.currentXP + 100
              res.diceCooldown = Date.now() + 30000

              if (res.currentXP >= res.nextLevel) {
                let overflow = res.currentXP - res.nextLevel
                let currentNL = res.nextLevel
                res.currentXP = overflow
                res.nextLevel = Math.round(currentNL + 1000)
                res.level = res.level + 1
                diceEmbed.addField(`Congratulations! You leveled up! You are now level ${res.level}`)
                res.save()
              } else if (res.currentXP < res.nextLevel){
                diceEmbed.addField("You have recieved 100 XP")
                res.save()
              }

              message.channel.send(firstEmbed).then((msg) => {
                setTimeout(function(){
                  msg.edit(diceEmbed);
                }, 1500);
              });

            } else if (userAmount > randomNumber) {
              diceEmbed.setColor("#FF0000")
              diceEmbed.setDescription("**Oh no! You lost!**")
              diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of ${userAmount}`)
              diceEmbed.addField("Limit", randomNumber)
              diceEmbed.addField("Result", `You lost $${userBet}!`)

              res.money = res.money - userBet
              res.currentXP = res.currentXP + 50
              res.diceCooldown = Date.now() + 30000

              if (res.currentXP >= res.nextLevel) {
                let overflow = res.currentXP - res.nextLevel
                let currentNL = res.nextLevel
                res.currentXP = overflow
                res.nextLevel = Math.round(currentNL + 1000)
                res.level = res.level + 1
                diceEmbed.addField(`Congratulations! You leveled up! You are now level ${res.level}`)
                res.save()
              } else if (res.currentXP < res.nextLevel){
                diceEmbed.addField("You have recieved 50 XP")
                res.save()
              }

              message.channel.send(firstEmbed).then((msg) => {
                setTimeout(function(){
                  msg.edit(diceEmbed);
                }, 1500);
              });


            } else if (userAmount === randomNumber) {
              diceEmbed.setColor("0x0099ff")
              diceEmbed.setDescription("**Well this is awkward.**")
              diceEmbed.addField("User Roll", `${userNumber} and a ${userNumber2} for a total of **$${userAmount}**`)
              diceEmbed.addField("Limit", randomNumber)
              diceEmbed.addField("Result", `You get your $${userBet} back!`)

              message.channel.send(firstEmbed).then((msg) => {
                setTimeout(function(){
                  msg.edit(diceEmbed);
                }, 1500);
              });
            }
          }
        }
      } else if (res.diceCooldown > Date.now()) {


        var remaining = humanizeDuration(res.diceCooldown - Date.now(), { conjunction: " and ", units: ["s"], round: true});

        let diceCooldownEmbed = new MessageEmbed()
          .setTitle("Uh oh!")
          .setColor("#FF0000")
          .setDescription(`You can only use that command once every 30 seconds!\nYou still have ${remaining} to wait!`)

        return message.channel.send(diceCooldownEmbed)
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
