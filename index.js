const Discord = require("discord.js");
const config = require("./botconfig.json");
const prefix = config.prefix;
const bot = new Discord.Client();
const fs = require("fs");
const ms = require('ms');
bot.commands = new Discord.Collection();
const Constants = require('discord.js/src/util/Constants.js')
Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`

// - Anti Spam - //
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
});

const commandFiles = fs.readdirSync("./commands/").filter((file => file.endsWith(".js")));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  console.log(`${command.name} command loaded!`);

  bot.commands.set(command.name, command);
}

bot.on("ready", () => {
  console.log(`${bot.user.tag} is now online!`);

  bot.user.setActivity(`${bot.guilds.cache.size} servers || .help`, { type: 3, browser: "DISCORD IOS"  });
});

bot.on("message", (message) => antiSpam.message(message));

bot.on("message", async message => {

  if(message.channel.type === "dm" && message.content[0] === ':') { message.author.send("My commands don\'t work in DM\'s!😞"); return;}

  const args = message.content.substring(prefix.length).split(" ");
  const command = args[0]
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  try {
    bot.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error executing that command. A log has been sent to the developer.')
  }

})

bot.login(config.token);
