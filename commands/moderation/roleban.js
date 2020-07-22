module.exports.run = (bot, message,args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return
  let guild = message.guild;
  let role = args[1];
  guild.members.forEach((member => {
    if (member.roles.has(role)) {
      member.ban();
    }
  }));
};

module.exports.help = {
  name: "roleban",
  description: "bans users that have the specified role",
  arguments: "<rolename>",
  category: "Moderation",
  aliases: ["roleban", "rb"]
};
