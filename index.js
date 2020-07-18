const Discord = require('discord.js');
const config = require('./botconfig.json');
const prefix = config.prefix;
const bot = new Discord.Client();
const fs = require('fs');
bot.commands = new Discord.Collection();
const Constants = require('discord.js/src/util/Constants.js')
Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  console.log(`${command.name} command loaded!`);

  bot.commands.set(command.name, command);
}

bot.on('ready', () => {
  console.log(`${bot.user.tag} is now online!`);

  bot.user.setActivity(`:help`, { type: 3, browser: "DISCORD IOS"  });
})

bot.on("message", async message => {

  if(message.channel.type == "dm" && message.content[0] == ':') { message.author.send('My commands don\'t work in DM\'s!😞'); return}

  let args = message.content.substring(prefix.length).split(" ");

  if (message.content === ':help') {
    const helpEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Command List')
      .setAuthor('Kukita#6512')
      .setDescription('A list of available commands')
      .addFields(
        {name: bot.commands.get('ban').name, value: bot.commands.get('ban').description, inline: true },
        {name: bot.commands.get('ping').name, value: bot.commands.get('ping').description, inline: true},
        {name: bot.commands.get('uptime').name, value: bot.commands.get('uptime').description, inline: true},
        {name: bot.commands.get('hello').name, value: bot.commands.get('hello').description, inline:true},
        {name: bot.commands.get('roleban').name, value: bot.commands.get('roleban').description, inline: true},
        {name: bot.commands.get('rolekick').name, value: bot.commands.get('rolekick').description, inline: true},
        {name: bot.commands.get('serverinfo').name, value: bot.commands.get('serverinfo').description, inline: true},
        {name: bot.commands.get('kick').name, value: bot.commands.get('kick').description, inline: true},
      )

      message.author.send(helpEmbed);
      message.reply('I have send you a DM!');

  }
  switch (args[0]) {

    case "hello": // test command

      bot.commands.get('hello').execute();

    break;

    case "kick": // kick command

      if (message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) {
        let member = message.mentions.members.first();
        let moderator = message.member;
        let guildname = message.guild;
        let reason = message.content.split(" ").slice(2);
        if (reason == '') {
          let noReason = 'Not specified';
          bot.commands.get('kick').execute(message, member, guildname, moderator, noReason);
        } else {
          bot.commands.get('kick').execute(message, member, guildname, moderator, reason);
        }
      } else {
        message.channel.send("You don't have permission to use this command!😞")
      }
    break;

    case "ban": //ban command

    if (message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")) {
      let member = message.mentions.members.first();
      let moderator = message.member;
      let guildname = message.guild;
      let reason = message.content.split(" ").slice(2);
      if (reason == ' ') {
        let reason = 'Not specified';
        bot.commands.get('ban').execute(message, member, guildname, moderator);
      } else {
        bot.commands.get('ban').execute(message, member, guildname, moderator, reason);
      }
    } else {
      message.channel.send("You have to have the BAN_MEMBERS or ADMINISTRATOR permission to use this command!😞");
    }
    break;

    case "serverinfo": // serverinfo command
      let guild = message.guild;
      var serverIcon = message.guild.iconURL({format: 'png'});
      const list = guild.id.fetchMembers()
      let online = 0;
      let idle = 0;
      let dnd = 0;
      let offline = 0; // online, idle, dnd, offline
      list.members.cache.forEach(member => {
        if (member.status === 'online') {
          online = online + 1;
        } else if(member.status === 'idle') {
          idle = idle + 1;
        } else if(member.status === "dnd") {
          dnd = dnd + 1;
        } else if(member.status === "offline") {
          offline = offline + 1;
        }
      })
      bot.commands.get('serverinfo').execute(message, guild, serverIcon, online, idle, dnd, offline);
    break;

    case "rolekick": // rolekick command

      if (message.members.hasPermission("ADMINISTRATOR")) {
        let guild = message.guild;
        let role = message.content.split(" ").slice(2);
        bot.commands.get('rolekick').execute(guild, role);
      } else {
        message.channel.send("You have to have the ADMINISTRATOR permission to use this command!😞");
      }
    break;

    case "roleban": // roleban command
      if (message.members.hasPermission("ADMINISTRATOR")) {
        let guild = message.guild;
        let role = message.content.split(" ").slice(2);
        bot.commands.get('roleban').execute(guild, role);
      } else {
        message.channel.send("You have to have the ADMINISTRATOR permission to use this command!😞");
      }
    break;

    case "ping": // ping command

      bot.commands.get('ping').execute(message, bot);

    break;

    case "uptime": // uptime command

      bot.commands.get('uptime').execute(message, bot);

    break;
  }
})

bot.login(config.token);
