const Discord = require("discord.js");
module.exports = {
  name: "help",
  description: "sends a list of commands that the bot understands",
  arguments: "none",
  execute(message, args) {
    let bot = message.client;
    const helpEmbed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Command List")
      .setAuthor("Kukita#6512", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
      .setThumbnail("https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
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
        {name: bot.commands.get("inviteme").name, value: `${bot.commands.get("inviteme").description}\n **Arguments:**\n ${bot.commands.get("inviteme").arguments}`, inline: true},
        {name: bot.commands.get("resetchannel").name, value: `${bot.commands.get("resetchannel").description}\n **Arguments:**\n ${bot.commands.get("resetchannel").arguments}`, inline: true},
        {name: bot.commands.get("vckick").name, value: `${bot.commands.get("vckick").description}\n **Arguments:**\n ${bot.commands.get("vckick").arguments}`, inline: true},
        {name: bot.commands.get("warn").name, value: `${bot.commands.get("warn").description}\n **Arguments:**\n ${bot.commands.get("warn").arguments}`, inline: true},
        {name: bot.commands.get("warns").name, value: `${bot.commands.get("warns").description}\n **Arguments:**\n ${bot.commands.get("warns").arguments}`, inline: true},
        {name: bot.commands.get("slowmode").name, value: `${bot.commands.get("slowmode").description}\n **Arguments:**\n ${bot.commands.get("slowmode").arguments}`, inline: true},
        {name: bot.commands.get("clearwarns").name, value: `${bot.commands.get("clearwarns").description}\n **Arguments:**\n ${bot.commands.get("clearwarns").arguments}`, inline: true}
      );

      message.author.send(helpEmbed);
      message.reply("I have sent you a DM!");

  }
}
