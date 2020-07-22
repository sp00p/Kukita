module.exports.run = (bot, message,args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return
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
