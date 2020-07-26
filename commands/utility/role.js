const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) return;

  let userID = message.mentions.users.first().id
  let selection = args[1]
  let roleInput = args.slice(2).join(" ")
  let member = message.guild.members.cache.get(userID)

  if (!roleInput) return message.channel.send("You have to specify a role!")

  var role = message.channel.guild.roles.cache.find(role => role.name === roleInput);

  if (!role) {
    return message.channel.send("Couldn't find that role!")
  } else {
    if (selection === "add") {
      member.roles.add(role);
      return message.channel.send("Role added to user successfully!")
    } else if (selection === "remove") {
      member.roles.remove(role);
      return message.channel.send("Role removed from user successfully!")
    }
  }

}

module.exports.help = {
  name: "role",
  description: "adds or removes a role to user",
  arguments: "<user> <add/remove> <rolename>",
  category: "Utility",
  aliases: ["role"]
};
