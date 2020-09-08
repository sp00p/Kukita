const { MessageEmbed } = require('discord.js');
const util = require('util');
const exec  = util.promisify(require('child_process').exec)

module.exports.run =  async (bot, message, args) => {
  if (!bot.config.owners.includes(message.author.id)) return;

  let command = message.content.substr(".exec ".length)

  exec(command, (error, data, getter) => {
    if (error) {
      message.channel.send("```" + error + "```")
    } else {
      message.channel.send("```" + data + "```")
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
