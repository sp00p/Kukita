const { MessageEmbed } = require("discord.js");
const mute = require('../../models/mute.js')

module.exports.run = (bot, message,args) => {
  if (!message.member.hasPermission("MUTE_MEMBERS", "ADMINISTRATOR")) return
    let member = message.guild.member(message.mentions.users.first());
    let moderator = message.author;
    let guildname = message.guild;

    if (!args[1]) {
      var reason = "Not Specified"
    } else {
      var reason = args.slice(1).join(" ")
    }

    const mutedEmbed = new MessageEmbed()
    .setColor("0x0099ff")
    .addFields(
      {name: "**Moderator**", value: moderator},
      {name: "**Action**", value: 'Mute'},
      {name: "**Guild**", value: guildname},
      {name: "**Reason**", value: reason}
    )
    .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png");

    mute.findOne({ User: member.id}, (err, data) => {
      if(err) console.log(err)
      if(!data) {
        let newMute = new mute({
          User: member.id
        })
        newMute.save()

        var mutedRole = message.guild.roles.cache.find(role => role.name === "Muted")

        if (!mutedRole) return message.channel.send("Do you have a role by the name of `Muted` set up?")

        member.roles.set([])
          .then(memberRoles => member.roles.add([mutedRole]))
          .catch(console.error)

        message.channel.send(`Successfully muted ${member}`);
        member.send(mutedEmbed)
      } else if (data) {
        return message.channel.send("That member is already muted! Did you mean to use `unmute`?")
      }
    })

}


module.exports.help = {
  name: "mute",
  description: "mutes a specified user",
  arguments: "<user> [reason]",
  category: "Moderation",
  aliases: ["mute"]
};
