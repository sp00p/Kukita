const Discord = require("discord.js");
const config = require("./botconfig.json");
const prefix = config.prefix;
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();
const Constants = require('discord.js/src/util/Constants.js')
Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam ({
  warnThreshold: 3,
  banThreshold: 7,
  maxInterval: 2000,
  warnMessage: '{@user}, Please stop spamming!',
  banMessage: '**{user_tag}** has been banned for spamming.',
  maxDuplicatesWarning: 7,
  maxDuplicatesBan: 15,
  deleteMessagesAfterBanForPastDays: 1,
  exemptPermissions: ['ADMINISTRATOR', "MANAGE_MESSAGES", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS"],
  ignoreBots: true,
  verbose: false,
  ignoredUsers:[],
  ignoredChannels: ["spam", "memes", "nsfw", "shitpost"]
});

const commandFiles = fs.readdirSync("./commands/").filter((file => file.endsWith(".js")));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  console.log(`${command.name} command loaded!`);

  bot.commands.set(command.name, command);
}

bot.on("ready", () => {
  console.log(`${bot.user.tag} is now online!`);

  bot.user.setActivity(`${bot.guilds.cache.size} servers || :help`, { type: 3, browser: "DISCORD IOS"  });
});

bot.on("message", async message => {

  if(message.channel.type === "dm" && message.content[0] === ':') { message.author.send("My commands don\'t work in DM\'s!😞"); return;}

  let args = message.content.substring(prefix.length).split(" ");

  if (message.content === ':help') {
    const helpEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Command List")
      .setAuthor("Kukita#6512", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
      .setDescription("A list of available commands")
      .addFields(
        {name: bot.commands.get("ban").name, value: `${bot.commands.get("ban").description}\n **Arguments:**\n ${bot.commands.get("ban").arguments}`, inline: true },
        {name: bot.commands.get("ping").name, value: `${bot.commands.get("ping").description}\n **Arguments:**\n ${bot.commands.get("ping").arguments}`, inline: true},
        {name: bot.commands.get("uptime").name, value: `${bot.commands.get("uptime").description}\n **Arguments:**\n ${bot.commands.get("uptime").arguments}`, inline: true},
        {name: bot.commands.get("hello").name, value: `${bot.commands.get("hello").description}\n **Arguments:**\n ${bot.commands.get("hello").arguments}`, inline:true},
        {name: bot.commands.get("roleban").name, value: `${bot.commands.get("roleban").description}\n **Arguments:**\n ${bot.commands.get("roleban").arguments}`, inline: true},
        {name: bot.commands.get("rolekick").name, value: `${bot.commands.get("rolekick").description}\n **Arguments:**\n ${bot.commands.get("rolekick").arguments}`, inline: true},
        {name: bot.commands.get("serverinfo").name, value: `${bot.commands.get("serverinfo").description}\n **Arguments:**\n ${bot.commands.get("serverinfo").arguments}`, inline: true},
        {name: bot.commands.get("kick").name, value: `${bot.commands.get("kick").description}\n **Arguments:**\n ${bot.commands.get("kick").arguments}`, inline: true},
        {name: bot.commands.get("createrole").name, value: `${bot.commands.get("createrole").description}\n **Arguments:**\n ${bot.commands.get("createrole").arguments}`, inline: true},
        {name: bot.commands.get("info").name, value: `${bot.commands.get("info").description}\n **Arguments:**\n ${bot.commands.get("info").arguments}`, inline: true},
        {name: bot.commands.get("botinfo").name, value: `${bot.commands.get("botinfo").description}\n **Arguments:**\n ${bot.commands.get("botinfo").arguments}`, inline: true},
        {name: bot.commands.get("purge").name, value: `${bot.commands.get("purge").description}\n **Arguments:**\n ${bot.commands.get("purge").arguments}`, inline: true},
        {name: bot.commands.get("inviteme").name, value: `${bot.commands.get("inviteme").description}\n **Arguments:**\n ${bot.commands.get("inviteme").arguments}`, inline: true}
      );

      message.author.send(helpEmbed);
      message.reply("I have sent you a DM!");

  }
  switch (args[0]) {

    case "hello": // test command

      bot.commands.get("hello").execute();

    break;

    case "kick": // kick command

      if (message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) {
        let member = message.mentions.members.first();
        let moderator = message.member;
        let guildname = message.guild;
        let reason = message.content.split(" ").slice(2);
        if (reason === "") {
          let noReason = "Not Specified";
          bot.commands.get("kick").execute(message, member, guildname, moderator, noReason);
        } else {
          bot.commands.get("kick").execute(message, member, guildname, moderator, reason);
        }
      } else {
        message.reply("You don't have permission to use this command!😞");
      }
    break;

    case "ban": //ban command

    if (message.member.hasPermission("BAN_MEMBERS", "ADMINISTRATOR")) {
      let member = message.mentions.members.first();
      let moderator = message.member;
      let guildname = message.guild;
      let reason = message.content.split(" ").slice(2);
      if (reason === "") {
        let reason = "Not specified";
        bot.commands.get("ban").execute(message, member, guildname, moderator);
      } else {
        bot.commands.get("ban").execute(message, member, guildname, moderator, reason);
      }
    } else {
      message.reply("You have to have the BAN_MEMBERS or ADMINISTRATOR permission to use this command!😞");
    }
    break;

    case "serverinfo": // serverinfo command
      let guild = message.guild;
      var serverIcon = message.guild.iconURL({format: "png"});
      bot.commands.get("serverinfo").execute(message, guild, serverIcon);
    break;

    case "rolekick": // rolekick command

      if (message.members.hasPermission("ADMINISTRATOR")) {
        let guild = message.guild;
        let role = message.content.split(" ").slice(2);
        bot.commands.get("rolekick").execute(guild, role);
      } else {
        message.reply("You have to have the ADMINISTRATOR permission to use this command!😞");
      }
    break;

    case "roleban": // roleban command

      if (message.members.hasPermission("ADMINISTRATOR")) {
        let guild = message.guild;
        let role = message.content.split(" ").slice(2);
        bot.commands.get("roleban").execute(guild, role);
      } else {
        message.reply("You have to have the ADMINISTRATOR permission to use this command!😞");
      }
    break;

    case "ping": // ping command

      bot.commands.get("ping").execute(message, bot);

    break;

    case "uptime": // uptime command

      bot.commands.get("uptime").execute(message, bot);

    break;

    case "createrole": // createrole command

      if (message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) {

          bot.commands.get("createrole").execute(message, args);

      } else {
        message.reply("You have to have the MANAGE_ROLES or ADMINISTRATOR permission to use this command!😞");
      }

    break;

    case "editrole": // editrole command

      if (message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) {

        let role = message.content.split(" ").slice(1);
        bot.commands.get("editrole").execute(message, role);

      }
    break;

    case "info": // viewmember command

      bot.commands.get("info").execute(message)

    break;

    case "botinfo": // botinfo command

      bot.commands.get("botinfo").execute(message)

    break;

    case "purge": // purge command

      if (message.member.hasPermission("MANAGE_MESSAGES")) {
        let number = message.content.split(" ").slice(1);
        bot.commands.get("purge").execute(message, number)
      } else {
        message.reply("You have to have the MANAGE_MESSAGES permission to use this command!😞")
      }
    break;

    case "inviteme": // inviteme command

      bot.commands.get("inviteme").execute(message);

    break;
  }
})

bot.login(config.token);
