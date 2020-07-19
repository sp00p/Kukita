const Discord = require("discord.js");

module.exports = {
  name: "createrole",
  description: "create a new role with the specified name",
  arguments: "none",
  execute(message, args) {
    if (message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) {
      message.channel.send("What would you like the new role name to be?");
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000});
      collector.on('collect', message => {
        let name = message.content;

        message.guild.roles.create({
          data: {
            name: name,
          },
        })

        message.channel.send(`${name} created successfully!`);
      })

    }
  }
};
