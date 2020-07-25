const { MessageEmbed } = require("discord.js");
const Money = require("../../models/money.js");
const humanizeDuration = require("humanize-duration");
const cooldown = require("../../models/cooldowns.js")

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  if (!bot.config.betatesters.includes(message.author.id)) return message.channel.send("This command currently being beta tested!")

  let weeklyWorkEmbed = new MessageEmbed()
    .setTitle("Congratulations!")
    .setDescription(`You made $100! Don't spend it all in one place!`)
    .setColor("RANDOM")

  const author = await message.author.id

  Money.findOne({ userID: message.author.id}, (err, data) => {
    if (err) console.log(err);

    cooldown.findOne({userID: message.author.id, command: 'daily'}, (err, res) => {
      if (err) console.log(err);

      if (!res) {
        //console.log('cooldown does not exist')

        if(!data) {
          //console.log('user does not have a cooldown and does not have money')
          let noAccountEmbed = new MessageEmbed()
          .setTitle("Oh no!")
          .setColor("#FF0000")
          .setDescription(`You don't have an account yet! Use ${bot.prefix}createaccount to create one!`)
          //console.log('new money account created, user did not have an account ')

          message.channel.send(noAccountEmbed)

        } else if (data){

          data.money = data.money + 100;
          data.save()
          message.channel.send(weeklyWorkEmbed)

          if(!res) {
            //console.log('cooldown does not exist but user has account')
            let newCooldown = new cooldown({
              userID: message.author.id,
              command: 'daily',
              cooldown: Date.now() + 8.64e+7
            })
            newCooldown.save()
          } else if (res) {
            //console.log('cooldown exists and user has money, updating cooldown')
            res.cooldown = Date.now() + 8.64e+7
          }
        }
      } else if (res.cooldown > Date.now()) {
        //console.log('cooldown more than date')

        var remaining = humanizeDuration(res.cooldown - Date.now(), { conjunction: " and ", units: ["d", "h", "m", "s"], round: true});

        let workCooldownEmbed = new MessageEmbed()
          .setTitle("Uh oh!")
          .setColor("#FF0000")
          .setDescription(`You can only use that command once per day!!\nYou still have ${remaining} to wait!`)

        message.channel.send(workCooldownEmbed)
      } else if (res.cooldown < Date.now()) {
        //console.log('cooldown less than date')
        data.money = data.money + 100;
        data.save()
        message.channel.send(weeklyWorkEmbed)
        res.cooldown = Date.now() + 8.64e+7
      }

    })
  })
}

module.exports.help = {
  name: "daily",
  description: "gives you a days worth of money",
  arguments: "",
  category: "Economy",
  aliases: ["daily"]
};
