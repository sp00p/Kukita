const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs")

module.exports.run = (bot, message, args) => {

  const helpEmbed = new MessageEmbed()
    .setColor("0x0099ff")
    .setAuthor("Kukita#6512", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
    .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
    .setTimestamp();
  if(args[0]) {
    let command = args[0];
    let cmd;
    if (bot.commands.has(command)) {
      cmd = bot.commands.get(command);
    } else if (bot.aliases.has(command)) {
      cmd = bot.commands.get(bot.aliases.get(command));
    }
    if(!cmd) return message.channel.send(helpEmbed.setTitle("Invalid Command").setDescription(`Do \`${bot.config.prefix}help <category> for the list of commands`))
    command = cmd.help;
    helpEmbed.setTitle(`**Command Information**`);
    helpEmbed.setDescription([
      `**Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`,
      `**Description:** ${command.description || "No Description provided."}`,
      `**Arguments:** ${command.arguments ? `\`${bot.config.prefix}${command.name} ${command.arguments}\`` : "No Arguments"} `,
      `**Aliases:** ${command.aliases ? command.aliases.join(", ") : "None"}`,
      `**Category:** ${command.category ? command.category : "Moderation" || "Utility"}`,
    ].join("\n"));

    return message.channel.send(helpEmbed);

  }
  const categories = readdirSync("./commands/");
  helpEmbed.setDescription([
    "Available commands for Kukita Bot.\n",
    "The bot prefix is .\n",
    "**<>** means that the argument is required and **[]** is optional\n"
  ].join("\n"));
  categories.forEach(category => {
    const dir = bot.commands.filter(c => c.help.category.toLowerCase() === category.toLowerCase());
    const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);

    try {
      if (dir.size === 0) return;
      if (bot.config.owners.includes(message.author.id)) helpEmbed.addField(`${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
    }
    catch (e) {
      console.log(e);
    }
  });
  return message.channel.send(helpEmbed);

}

module.exports.help = {
  name: "help",
  description: "sends a list of commands that the bot understands",
  arguments: "",
  category: "Utility",
  aliases: ["help", "h"]
};
