const Discord = require("discord.js");

module.exports = {
  name: "resetchannel",
  description: "deletes the channel and starts it from scratch",
  arguments: "none",
  execute(message, args) {
    // add confirmation
    if (message.author.hasPermission("ADMINISTRATOR")) {
      let bot = message.client;
      let originalChannel = message.channel;
      message.channel.send("Are you sure that you want to do this? It will delete all messages and message history relating to this channel. This is NOT reversible!(Y/N)")
      const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000});
      collector.on('collect', message => {
        if (message.content === "Y") {
          bot.channels.cache.get(message.channel.id).clone(undefined, true, false, "Wipe channel")
          .then(clone => message.author.send(`Successfully cloned ${originalChannel.name}`))
          .then(bot.channels.cache.get(originalChannel.id).delete())
          .catch(console.error);
        } else if (message.content === "N") {
          message.channel.send("Channel wipe canceled!")
        }
      })
    } else {
      message.reply("You have to have the ADMINISTRATOR permission to use this command!😞");
    }
  }
}
