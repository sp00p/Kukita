const { Client, Collection} = require("discord.js");
const config = require("./config");
const bot = new Client();
const { readdirSync } = require("fs");
const { sep } = require("path");
const {success, error, warning} = require("log-symbols");
const GuildModel = require('./models/warn.js')
const { connect } = require('mongoose');
bot.config = config;
["commands", "aliases"].forEach(x => bot[x] = new Collection())
const db = connect('', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
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
const load = (dir = "./commands/") => {

}
  readdirSync(dir).forEach(dirs => {

    const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith(".js"));

    for (const file of commands) {

      const pull = require(`${dir}/${dirs}/${file}`);

      if (pull.help && typeof (pull.help.name) === "string" && typeof (pull.help.category === "string")) {
        if (bot.commands.get(pull.help.name)) return console.warn(`${warning} Two or more commands have the same name ${pull.help.name}`)
        bot.commands.set(pull.help.name, pull);
        console.log(`${success} Loaded command ${pull.help.name}.`);
      } else {
        console.log(`${error} Error loading command in ${dir}${dirs}. missing help.name or help.name is not a string. or you have a missing help.category or help.category is not a string`);
        continue;
      }
    if (pull.help.aliases && typeof (pull.help.aliases) === "object") {
      pull.help.aliases.forEach(alias => {
        if (bot.aliases.get(alias)) return console.warn(`${warning} Two or more commands with the same alias ${alias}`)
        bot.aliases.set(alias, pull.help.name);
        });
      }
    }
  });

};

load();

bot.on("ready", () => {
  console.log(`${bot.user.tag} is now online!`);

  bot.user.setActivity(`${bot.guilds.cache.size} servers || .help`, { type: 3, browser: "DISCORD IOS"  });
});

bot.on("message", (message) => antiSpam.message(message));

bot.on("message", async message => {

  if(message.channel.type === "dm" && message.content[0] === '.') {
    return message.author.send("My commands don\'t work in DM\'s!😞")
  const prefix = config.prefix;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

    const command = args[0]
  let command;

      bot.commands.get(command).execute(message, args);
  if (message.author.bot || !message.guild) return;

  if (!message.member) message.member = await message.guild.fetchMember(message.author);


  if(cmd.length === 0) return;
  else if (bot.aliases.has(cmd)) command = bot.commands.get(bot.aliases.get(cmd));

  if (command) command.run(bot, message, args);

});

(async () => {
  await db;
  return bot.login(config.token)
})()
