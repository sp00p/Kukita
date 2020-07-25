const { MessageEmbed } = require("discord.js");
const mainSchema = require("../../models/mainschema.js");

module.exports.run = async (bot, message, args) => {

  //if (!bot.config.owners.includes(message.author.id)) return message.channel.send("This command is temporarily disabled for maintenance!")

  if (!bot.config.betatesters.includes(message.author.id)) return
  if (!bot.config.betatestingchannelid.includes(message.channel.id)) return

  mainSchema.findOne({userID: message.author.id}, (err, data) => {

    if(err) console.log(err)

    if (data) {

      let alreadyHasAccount = new MessageEmbed()
      .setTitle("Oh no!")
      .setColor("#FF0000")
      .setDescription("You already have an account!")

      return message.channel.send(alreadyHasAccount)


    } else if (!data) {

      let newAccount = new mainSchema({
        userID: message.author.id,
        username: message.author.username,
        dailyCooldown: Date.now(),
        weeklyCooldown: Date.now(),
        workCooldown: Date.now(),
        robCooldown: Date.now(),
        cfCooldown: Date.now(),
        diceCooldown: Date.now(),
        rlCooldown: Date.now(),
        slotsCooldown: Date.now(),
        money: 0,
        currentXP: 0,
        nextLevel: 100,
        isVoter: false,
        level: 1,
        isPassive: true,
        rank: "None"
      })
      newAccount.save()

      let createdAccountEmbed = new MessageEmbed()
      .setTitle("Success!")
      .setColor("#00FF00")
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription("Account successfully created!")

      return message.channel.send(createdAccountEmbed)
    }

  })
}

module.exports.help = {
  name: "createaccount",
  description: "sends how much money you have in your guild",
  arguments: "",
  category: "Economy",
  aliases: ["createaccount", "create"]
};
