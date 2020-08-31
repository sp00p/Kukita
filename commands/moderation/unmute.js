const { MessageEmbed } = require("discord.js");
const mute = require('../../models/mute.js')

module.exports.run = (bot, message,args) => {
  if (!message.member.hasPermission("MUTE_MEMBERS", "ADMINISTRATOR")) return

    let member = message.guild.member(message.mentions.users.first());

    mute.findOne({ User: member.id}, (err, data) => {
      if(err) console.log(err)
      if(!data) {
        message.channel.send("That member is not muted!");
      } else if (data) {
        mute.findOneAndDelete({User: member.id}, (err, res) => {
          res.save().catch(console.log(err));
          member.roles.set([])
          message.channel.send(`${member} has been unmuted!`)
        })
      }
    })

}

module.exports.help = {
  name: "unmute",
  description: "unmutes specific user",
  arguments: "<user>",
  category: "Moderation",
  aliases: ["unmute"]
};
