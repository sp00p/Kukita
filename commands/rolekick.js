module.exports = {
  name: "rolekick",
  description: "kicks users that have the specified role",
  arguments: "<rolename>",
  execute(message, args) {
    if (message.author.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) {
      guild.members.forEach((member => {
        if (member.roles.has(role)) {
          member.kick();
        }
      }));
    } else {
      message.reply("You have to have the KICK_MEMBERS or ADMINISTRATOR permission to use this command!😞");
    }
  }
};
