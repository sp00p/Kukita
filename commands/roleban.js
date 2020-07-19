module.exports = {
  name: "roleban",
  description: "bans users that have the specified role",
  arguments: "<rolename>",
  execute(message, args) {
    if (message.author.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")) {
      let guild = message.guild;
      let role = args[1];
      guild.members.forEach((member => {
        if (member.roles.has(role)) {
          member.ban();
        }
      }));
    } else {
      message.reply("You have to have the BAN_MEMBERS or ADMINISTRATOR permission to use this command!😞");
    }
  }
};
