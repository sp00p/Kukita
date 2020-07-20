module.exports.run = (bot, message,args) => {
  if (message.member.hasPermission("ADMINISTRATOR")) {
    guild.members.forEach((member => {
      if (member.roles.has(role)) {
        member.kick();
      }
    }));
  } else {
    message.reply("You have to have the ADMINISTRATOR permission to use this command!😞");
  }
};

module.exports.help = {
  name: "rolekick",
  description: "kicks users that have the specified role",
  arguments: "<rolename>",
  category: "Moderation",
  aliases: ["rk"]
};
