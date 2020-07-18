module.exports = {
  name: 'rolekick',
  description: 'kicks users that have the specified role',
  arguments: '<rolename>',
  execute(guild, role) {
    guild.members.forEach(member => {
      if (member.roles.has(role)) {
        member.kick();
      }
    })
  }
}
