module.exports.run = (bot, message,args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You have to have the ADMINISTRATOR permission to use this command!😞");
    guild.members.forEach((member => {
      if (member.roles.has(role)) {
        member.kick();
      }
    }));
};

module.exports.help = {
  name: "rolekick",
  description: "kicks users that have the specified role",
  arguments: "<rolename>",
  category: "Moderation",
  aliases: ["rolekick", "rk"]
};
