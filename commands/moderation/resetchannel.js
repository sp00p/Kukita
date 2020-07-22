const { MessageCollector } = require("discord.js");

module.exports.run = (bot, message,args) => {
    //=============================================//
    //
    //     Created by https://github.com/sp00p
    //          (please leave this here)
    //
    //=============================================//
  if (!message.member.hasPermission("ADMINISTRATOR")) return
  let originalChannel = message.channel;
  message.channel.send("Are you sure that you want to do this? It will delete all messages and message history relating to this channel. This is NOT reversible!(Y/N)")
  const collector = new MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000});
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
}

module.exports.help = {
  name: "resetchannel",
  description: "deletes the channel and creates a new one with the same roles/permissions in the same category",
  arguments: "",
  category: "Moderation",
  aliases: ["resetchannel", "rc"]
};
