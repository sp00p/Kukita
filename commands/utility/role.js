const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message,args) => {
  if(!message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) return message.channel.send("You have to have the MANAGE_ROLES or ADMINISTRATOR permission to use this command!😞");

  if(args[0].toLowerCase() == 'create') {
    let rName = args[1]
    let rColor;
    args.forEach(arg=>{
      if(arg.startsWith("#")) {
        rColor=arg
      }
    })
    if(!rName){
      return message.channel.send("Please specify a role name!")
    }
    if(!rColor){
      return message.channel.send("Please specify a color!")
    }
    if (rColor >= 16777215) return message.channel.send("The hex color provided was out of range! Keep it between 16777215")
    if (rColor <= 0) return message.channel.send("The hex color provided was out of range! Keep it between 0 and 16777215")
    rName = rName.replace(`_`, ` `)
    let rNew = await message.guild.roles.create({
      data: {
        name: rName,
        color: rColor,
      }
    })
    const roleCreateEmbed = new MessageEmbed()
    .setTitle("New Role Created!")
    .setDescription(`**${message.author.username} has created a role!**\n Name: ${rName}\n ID: ${rName.id}\n Color: ${rColor}`)
    .setColor(rColor)
    message.channel.send(roleCreateEmbed)


  } else if(args[0].toLowerCase() == 'delete') {
    let deleteRole = args[1]
    deleteRole = deleteRole.replace(`_`, ` `)
    let roleToDelete = message.guild.roles.cache.get(deleteRole) || message.guild.roles.cache.find(r => r.name == deleteRole)
    if(!roleToDelete) return message.channel.send("You didn't tell me which role I should delete!")
    roleToDelete.delete();
    const roleDeleteEmbed = new MessageEmbed()
    .setTitle("Role Deleted!")
    .setDescription(`**${message.author.username} has deleted a role!**\n Name: ${roleToDelete.name}\n ID: ${roleToDelete.id}\n Color: ${roleToDelete.color}`)
    .setColor(roleToDelete.color)
    message.channel.send(roleDeleteEmbed)
  }
}

module.exports.help = {
  name: "role",
  description: "creates/deletes a roles for you. use _'s as spaces for both creating and deleting roles.",
  arguments: "<rolename> <hex color>",
  category: "Utility",
  aliases: ["role"]
};
