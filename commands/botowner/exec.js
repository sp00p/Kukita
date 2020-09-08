const { MessageEmbed } = require('discord.js');
const util = require('util');
const exec  = util.promisify(require('child_process').exec)

module.exports.run =  async (bot, message, args) => {
  if (!bot.config.owners.includes(message.author.id)) return;

  let command = message.content.substr(".exec ".length)

  exec(command, (error, data, getter) => {
    if (error) {
      let errorEmbed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle("\❌ Error!")
        .setDescription("```" + error + "```")
        .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
      message.channel.send(errorEmbed);
    } else {
      let successEmbed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle("Here you go")
        .setDescription("```" + data + "```")
        .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
      message.channel.send(successEmbed);
    }
  })

}

module.exports.help = {
  name: "exec",
  description: "executed stuff that's not js",
  arguments: "<command>",
  category: "Owner",
  aliases: ["exec"]
}
