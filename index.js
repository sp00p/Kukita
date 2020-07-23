const { Client, Collection} = require("discord.js");
const config = require("./config");
const bot = new Client();
const { readdirSync } = require("fs");
const { sep, resolve, join } = require("path");
const {success, error, warning} = require("log-symbols");
const GuildModel = require('./models/warn.js');
const { connect } = require('mongoose');
const Money = require("./models/money.js");
const blacklist = require("./models/blacklist.js");
const blacklistuser = require("./models/blacklistuser.js");
const Prefix = require("./models/prefix.js")
bot.snipes = new Collection();
let prefix;
bot.config = config;
["commands", "aliases"].forEach(x => bot[x] = new Collection())
const db = connect('mongodb+srv://root:OJ8Iyz6nzgmBjW51@cluster0.921xq.mongodb.net/Data', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
const Constants = require('./node_modules/discord.js/src/util/Constants.js')
Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`

// - Anti Spam - //
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam ({
  warnThreshold: 8,
  kickThreshold: 15,
  banThreshold: 30,
  maxInterval: 2000,
  warnMessage: '{@user}, Please stop spamming! You will be kicked if you send 7 more of the same message!',
  banMessage: '**{user_tag}** has been banned for spamming.',
  maxDuplicatesWarning: 7,
  maxDuplicatesBan: 15,
  deleteMessagesAfterBanForPastDays: 1,
  exemptPermissions: ['ADMINISTRATOR', "MANAGE_MESSAGES", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS"],
  ignoreBots: true,
  verbose: false,
  ignoredUsers:[],
});

var blockedUsers = [];

const load = (dir = "./commands/") => {

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

bot.on("messageDelete", async (message) => {

  if (message.author.bot) return;

  const snipes = bot.snipes.get(message.channel.id) || [];
  snipes.unshift({
    content: message.content,
    author: message.author,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null,
    date: new Date().toLocaleString("en-GB", { dataStyle: "full", timeStyle: "short"})
  })
  snipes.splice(10);
  bot.snipes.set(message.channel.id, snipes)
})

bot.on("message", async message => {

  if (message.author.bot || !message.guild) return;

  Prefix.findOne({ serverID: message.guild.id }, (err, data) => {
    if (err) console.log(err);

    if(data) {
      prefix = data.prefix
    } else if (!data) {
      prefix = config.prefix
    }

    let command;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (message.channel.type === 'dm') return;

    if (!message.content.startsWith(prefix)) return;

    if (bot.commands.has(cmd)) command = bot.commands.get(cmd);
    else if (bot.aliases.has(cmd)) command = bot.commands.get(bot.aliases.get(cmd));

    // Money System
    let chance = Math.floor(Math.random() * 100) + 1;
    if (chance > 50) {

      let moneyToAdd = Math.ceil(Math.random() * 10) + 5;

      Money.findOne({ userID: message.author.id, serverID: message.guild.id},(err, res) => {
        if (err) console.log(err);

        if(!res) {
          const newDoc = new Money ({
            userID: message.author.id,
            username: message.author.username,
            serverID: message.guild.id,
            money: moneyToAdd
          })
          newDoc.save().catch(err => console.log(err));
        } else {
          res.coins = res.coins + moneyToAdd;
          res.save().catch(err => console.log(err));
        }
      })
    }

    if(command) {
      blacklist.findOne({ Guild: message.guild.id }, (err, res) => {
        if(res) {
          return
        } else if (!res) {

          blacklistuser.findOne({userID: message.author.id}, (err, res) => {
            if (res) {
              return
            } else if (!res) {
              if (command) command.run(bot, message, args);
            }
          })
        }
      })
    }
  });
});

(async () => {
  await db;
  return bot.login(bot.config.token).catch(console.error());
})()
