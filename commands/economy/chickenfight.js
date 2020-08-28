15000const { MessageEmbed } = require("discord.js");
const mainSchema = require("../../models/mainschema.js")
const humanizeDuration = require('humanize-duration')

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  //if (!bot.config.betatesters.includes(message.author.id)) return
  //if (!bot.config.betatestingchannelid.includes(message.channel.id)) return

  let noAccountEmbed = new MessageEmbed()
  .setTitle("Oh no!")
  .setColor("#FF0000")
  .setDescription(`You don't have an account yet! Use ${bot.prefix}create to create one!`)
  let number = 8
  let imageNum1 = Math.floor(Math.random() * (number - 1 + 1)) * 1;
  let imageNum2 = Math.floor(Math.random() * (number - 1 + 1)) * 1;

  let chicken1
  let chicken2

  let userBet = args[0]

  if (isNaN(userBet)) {
    return message.channel.send("You need to bet a number!")
  }

  let names = ["Brad", "Robin", "Derek", "Troy", "Dave", "Alex", "Robert", "Paul"]

  let chickenOneEmbed = new MessageEmbed()
  .setTitle("🐔🥊 THE MATCHUP 🐔🥊")
  .addField(`${names[imageNum1]}`, )

  switch(imageNum1) {
    case 0:
      chicken1 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659585049559091/chicken0.png'
      break;
    case 1:
      chicken1 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659599779692594/chicken1.png'
      break;
    case 2:
      chicken1 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659611246919730/chicken2.png'
      break;
    case 3:
      chicken1 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659624949710908/chicken3.png'
      break;
    case 4:
      chicken1 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659585049559091/chicken0.png'
      break;
    case 5:
      chicken1 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659599779692594/chicken1.png'
      break;
    case 6:
      chicken1 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659611246919730/chicken2.png'
      break;
    case 7:
      chicken1 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659624949710908/chicken3.png'
      break;

  }

  switch(imageNum2) {
    case 0:
      chicken2 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659585049559091/chicken0.png'
      break;
    case 1:
      chicken2 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659599779692594/chicken1.png'
      break;
    case 2:
      chicken2 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659611246919730/chicken2.png'
      break;
    case 3:
      chicken2 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659624949710908/chicken3.png'
      break;
    case 4:
      chicken2 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659585049559091/chicken0.png'
      break;
    case 5:
      chicken2 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659599779692594/chicken1.png'
      break;
    case 6:
      chicken2 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659611246919730/chicken2.png'
      break;
    case 7:
      chicken2 = 'https://cdn.discordapp.com/attachments/715404655168978944/736659624949710908/chicken3.png'
      break;
  }

  let chance = Math.floor(Math.random() * 100) + 1

  let cmdEmbed = new MessageEmbed()

  let newCFEmbed1 = new MessageEmbed()
  .setTitle(`🐔 ${names[imageNum1]} steps into the ring 🐔`)
  .setThumbnail(chicken1)
  .setColor("RANDOM")

  let newCFEmbed2 = new MessageEmbed()
  .setTitle(`🐔 ${names[imageNum2]} steps into the ring 🐔`)
  .setThumbnail(chicken2)
  .setColor("RANDOM")

  let betEmbed = new MessageEmbed()
  .setTitle("💸 PLACE YOUR BET 💸")
  .setDescription(`React with :one: if you want to bet on ${names[imageNum1]}\nReact with :two: if you want to bet on ${names[imageNum2]}\nReact with :three: if you want to call off the fight!`)
  .addField("Bet Amount", userBet)
  .setFooter("You have 10 seconds to react to this message before the fight gets called off!")

  let chicken1WinEmbed = new MessageEmbed()
  .setTitle(`🐔🥊 ${names[imageNum1]} Won! 🐔🥊`)
  .setDescription(`${names[imageNum1]} won the fight after ${Math.floor(Math.random() * 10) + 1} grueling rounds!`)

  let chicken2WinEmbed = new MessageEmbed()
  .setTitle(`🐔🥊 ${names[imageNum2]} Won! 🐔🥊`)
  .setDescription(`${names[imageNum2]} won the fight after ${Math.floor(Math.random() * 10) + 1} grueling rounds!`)

  let fightCalledOffEmbed = new MessageEmbed()
  .setTitle(`❌ The fight has been called off! ❌`)
  .setColor("#FF0000")
  .setDescription(`The user decided to call off the fight!`)

  let noReactionEmbed = new MessageEmbed()
  .setTitle(`❌ The fight has been called off! ❌`)
  .setColor("#FF0000")
  .setDescription(`The user decided to call off the fight!`)

  let drawEmbed = new MessageEmbed()

  let firstEmbed = new MessageEmbed()
  .setTitle("Fighting...🥊")

  mainSchema.findOne({userID: message.author.id}, (err, data) => {

    if (!data) {

      return message.channel.send(noAccountEmbed)

    } else if (data) {

      if (data.cfCooldown < Date.now()) {

        if (data.money < userBet) return message.channel.send("You don't have that much money to bet!")

        if (data.money > userBet) {

          message.channel.send(newCFEmbed1)
          message.channel.send(newCFEmbed2)

          message.channel.send(betEmbed).then(sentEmbed => {
            sentEmbed.react('1️⃣')
            sentEmbed.react('2️⃣')
            sentEmbed.react('3️⃣')

            const filter = (reaction, user) => {
              return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.id === message.author.id
            };

            sentEmbed.awaitReactions(filter, {max: 1, time: 10000, errors: ['time'] })
              .then(collected => {

                const reaction = collected.first();

                if (reaction.emoji.name === '1️⃣') {

                  if (chance < 50) {

                    sentEmbed.edit(firstEmbed)

                    chicken1WinEmbed.setColor("#00FF00")
                    chicken1WinEmbed.addField("Result", `Your chicken won! You recieved ${userBet * 2} coins!`)

                    setTimeout(function(){
                      data.money = data.money + userBet*2
                      data.cfCooldown = Date.now() + 15000
                      data.currentXP = data.currentXP + 500
                      if (data.currentXP >= data.nextLevel) {
                        let overflow = data.currentXP - data.nextLevel
                        let currentNL = data.nextLevel
                        data.currentXP = overflow
                        data.nextLevel = currentNL + 1000
                        data.level = data.level + 1
                        data.money = data.money + 200
                        chicken1WinEmbed.addField("Level up!", `Congratulations! You leveled up and got 200 coins! You are now level ${data.level}`)
                        data.save()
                      } else {
                        chicken1WinEmbed.addField("XP Recieved", "You have recieved 500 XP")
                        data.save()
                      }
                      return sentEmbed.edit(chicken1WinEmbed);
                    }, 1500);

                  } else if (chance > 50) {

                    sentEmbed.edit(firstEmbed)

                    chicken2WinEmbed.setColor("#FF0000")
                    chicken2WinEmbed.addField("Result", `Your chicken lost! You lose ${userBet} coins!`)


                    setTimeout(function(){
                      data.money = data.money - userBet
                      data.cfCooldown = Date.now() + 15000
                      data.currentXP = data.currentXP + 250
                      if (data.currentXP >= data.nextLevel) {
                        let overflow = data.currentXP - data.nextLevel
                        let currentNL = data.nextLevel
                        data.currentXP = overflow
                        data.nextLevel = currentNL + 1000
                        data.level = data.level + 1
                        data.money = data.money + 200
                        chicken2WinEmbed.addField("Level up!", `Congratulations! You leveled up and got 200 coins! You are now level ${data.level}`)
                        data.save()
                      } else {
                        chicken2WinEmbed.addField("XP Recieved", "You have recieved 250 XP")
                        data.save()
                      }
                      return sentEmbed.edit(chicken2WinEmbed);
                    }, 1500);

                  } else if (chance === 50) {

                    drawEmbed.setTitle(`Well this is awkward.`)
                    drawEmbed.setDescription(`After ${Math.floor(Math.random() * 10) + 1} grueling rounds, both chickens were unable to continue!\n You recieve your money back!`)
                    return sentEmbed.edit(drawEmbed)
                  }

                } else if (reaction.emoji.name === '2️⃣') {
                  if (chance < 50) {

                    sentEmbed.edit(firstEmbed)

                    chicken1WinEmbed.setColor("#FF0000")
                    chicken1WinEmbed.addField("Result", `Your chicken lost! You lose ${userBet} coins!`)


                    setTimeout(function(){
                      data.money = data.money - userBet
                      data.cfCooldown = Date.now() + 15000
                      data.currentXP = data.currentXP + 250
                      if (data.currentXP >= data.nextLevel) {
                        let overflow = data.currentXP - data.nextLevel
                        let currentNL = data.nextLevel
                        data.currentXP = overflow
                        data.nextLevel = currentNL + 1000
                        data.level = data.level + 1
                        data.money = data.money + 200
                        chicken1WinEmbed.addField("Level up!", `Congratulations! You leveled up and got 200 coins! You are now level ${data.level}`)
                        data.save()
                      } else {
                        chicken1WinEmbed.addField("XP Recieved", "You have recieved 250 XP")
                        data.save()
                      }
                      return sentEmbed.edit(chicken1WinEmbed);
                    }, 1500);


                  } else if (chance > 50) {

                    sentEmbed.edit(firstEmbed)

                    chicken2WinEmbed.setColor("#00FF00")
                    chicken2WinEmbed.addField("Result", `Your chicken won! You recieved ${userBet * 2} coins!`)

                    setTimeout(function(){
                      data.money = data.money + userBet*2
                      data.cfCooldown = Date.now() + 30000
                      data.currentXP = data.currentXP + 500
                      if (data.currentXP >= data.nextLevel) {
                        let overflow = data.currentXP - data.nextLevel
                        let currentNL = data.nextLevel
                        data.currentXP = overflow
                        data.nextLevel = currentNL + 1000
                        data.level = data.level + 1
                        data.money = data.money + 200
                        chicken2WinEmbed.addField("Level up!", `Congratulations! You leveled up and got 200 coins! You are now level ${data.level}`)
                        data.save()
                      } else {
                        chicken2WinEmbed.addField("XP Recieved", "You have recieved 500 XP")
                        data.save()
                      }
                      return sentEmbed.edit(chicken2WinEmbed);
                    }, 1500);


                  } else if (chance === 50) {

                    sentEmbed.edit(firstEmbed)


                    setTimeout(function(){
                      return sentEmbed.edit(drawEmbed);
                    }, 1500);


                  }
                } else if (reaction.emoji.name === '3️⃣') {

                  return message.channel.send(fightCalledOffEmbed)
                }
              })
              .catch(collected => {

                message.channel.send(noReactionEmbed)
              })
          })

        }

      } else if (data.cfCooldown > Date.now()) {
        var remaining = humanizeDuration(data.cfCooldown - Date.now(), { conjunction: " and ", units: ["s"], round: true});

        let cfCooldownEmbed = new MessageEmbed()
          .setTitle("Uh oh!")
          .setColor("#FF0000")
          .setDescription(`You can only use that command once every 30 seconds!\nYou still have ${remaining} to wait!`)

        return message.channel.send(cfCooldownEmbed)

      }

    }


  })

}

module.exports.help = {
  name: "chickenfight",
  description: "allows you to bet on a chicken fight",
  arguments: "<bet amount>",
  category: "Economy",
  aliases: ["chickenfight", "cf"]
};
