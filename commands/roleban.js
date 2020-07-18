module.exports = {
  name: "roleban",
  description: "bans users that have the specified role",
  arguments: "<rolename>",
  execute(guild, role) {
    guild.members.forEach(member => {
      if (member.roles.has(role)) {
        member.ban();
      };
    });
  }
};
