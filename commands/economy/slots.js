const { MessageEmbed } = require("discord.js");
const mainSchema = require("../../models/mainschema.js")
const humanizeDuration = require('humanize-duration')

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  if (!bot.config.betatesters.includes(message.author.id)) return
  if (!bot.config.betatestingchannelid.includes(message.channel.id)) return

  let noAccountEmbed = new MessageEmbed()
  .setTitle("Oh no!")
  .setColor("#FF0000")
  .setDescription(`You don't have an account yet! Use ${bot.prefix}create to create one!`)

  var randomInArray = function (anArray){
	//TODO : Check if anArray is really an array.

	var randomIndex=Math.floor(Math.random()*anArray.length)
	return anArray[randomIndex];
}

  if (isNaN(args[0])) {
    return message.channel.send("You need to bet a number!")
  }

  const emotes = [':tangerine:', ':watermelon:', ':pear:', ':grapes:', ':cherries:', ':banana:', ':seven:']
  let slotNums = []
  let random
  let result
  let winnings
  let count
  let slotString = '**:slot_machine: SLOTS :slot_machine:**\n--------------\n'

  let userBet = args[0]
  if (!userBet) return message.channel.send("Enter a bet amount!")

  let slotsEmbed = new MessageEmbed()

  let firstEmbed = new MessageEmbed()
  firstEmbed.setTitle("Spinning...")

  mainSchema.findOne({userID: message.author.id}, (err, data) => {

    if (!data) {

      return message.channel.send(noAccountEmbed)

    } else if (data) {

      if (data.slotsCooldown > Date.now()) {

        var remaining = humanizeDuration(data.slotsCooldown - Date.now(), { conjunction: " and ", units: ["s"], round: true});

        let slotsCooldownEmbed = new MessageEmbed()
          .setTitle("Uh oh!")
          .setColor("#FF0000")
          .setDescription(`You can only use that command once every 30 seconds!\nYou still have ${remaining} to wait!`)

        return message.channel.send(slotsCooldownEmbed)

      } else if (data.slotsCooldown <= Date.now()) {
        userBet = Math.round(userBet)

        if (userBet > data.money) return message.channel.send("You don't have that much money to bet!")

        for (count = 0; count < 9; count++) {

          random = randomInArray(emotes)
          slotNums.push(random)
          slotString += slotNums[count] + ' '

          if (count === 2 || count === 5 || count === 8) {
            if (count === 5) {slotString += "**<--**"}
            slotString += '\n'
          } else {
            slotString += ': '
          }

        }
        slotString += '--------------\n'
        if (slotNums[3] === slotNums[4] && slotNums[3] === slotNums[5] && slotNums [4] === slotNums[5]) {

          slotsEmbed.setColor("#00FF00")
          winnings = `$${userBet * 3}`
          result = "You got three in a row! You have tripled your bet!"

          data.money = userBet * 3
          data.slotsCooldown = Date.now() + 30000
          data.currentXP = data.currentXP + 125
          if (data.currentXP >= data.nextLevel) {
            let overflow = res.currentXP - res.nextLevel
            let currentNL = res.nextLevel
            data.currentXP = overflow
            data.nextLevel = Math.round(currentNL + 1000)
            data.level = data.level + 1
            slotsEmbed.addField(`Congratulations! You leveled up! You are now level ${data.level}`)
            data.save()
          } else if (data.currentXP < data.nextLevel){
            slotsEmbed.addField("You have recieved 125 XP")
            data.save()
          }

        } else if (slotNums[3] === slotNums [4] || slotNums[3] === slotNums [5] || slotNums[4] === slotNums[5]) {

          slotsEmbed.setColor("#00FF00")
          winnings = `$${userBet * 2}`
          result = "You got two matches! You have doubled your bet!"

          data.money = userBet * 2
          data.slotsCooldown = Date.now() + 30000
          data.currentXP = data.currentXP + 100
          if (data.currentXP >= data.nextLevel) {
            let overflow = res.currentXP - res.nextLevel
            let currentNL = res.nextLevel
            data.currentXP = overflow
            data.nextLevel = Math.round(currentNL + 1000)
            data.level = data.level + 1
            slotsEmbed.addField(`Congratulations! You leveled up! You are now level ${data.level}`)
            data.save()
          } else if (data.currentXP < data.nextLevel){
            slotsEmbed.addField("You have recieved 100 XP")
            data.save()
          }
        } else {

          slotsEmbed.setColor("#FF0000")
          winnings = `-$${userBet}`
          result = "You didn't get any matches! You lose!"

          data.money = data.money - userBet
          data.slotsCooldown = Date.now() + 30000
          data.currentXP = data.currentXP + 50
          if (data.currentXP >= data.nextLevel) {
            let overflow = res.currentXP - res.nextLevel
            let currentNL = res.nextLevel
            data.currentXP = overflow
            data.nextLevel = Math.round(currentNL + 1000)
            data.level = data.level + 1
            slotsEmbed.addField(`Congratulations! You leveled up! You are now level ${data.level}`)
            data.save()
          } else if (data.currentXP < data.nextLevel){
            slotsEmbed.addField("You have recieved 50 XP")
            data.save()
          }
          data.save()
        }

        slotsEmbed.setDescription(slotString)
        slotsEmbed.addField("Result", result)
        slotsEmbed.addField("Winnings", winnings)

        message.channel.send(firstEmbed).then((msg) => {
          setTimeout(function(){
            msg.edit(slotsEmbed);
          }, 1500);
        });

        }

      }

  })

}

module.exports.help = {
  name: "slots",
  description: "allows you to play slots",
  arguments: "<bet amount>",
  category: "Economy",
  aliases: ["slots"]
};
