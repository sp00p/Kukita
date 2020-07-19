module.exports = {
  name: "resetchannel",
  description: "deletes the channel and starts it from scratch",
  arguments: "none",
  execute(message, bot, originalChannel) {
    // add confirmation
    bot.channels.cache.get(message.channel.id).clone(undefined, true, false, "Wipe channel")
    .then(clone => message.author.send(`Successfully cloned ${originalChannel.name}`))
    .then(bot.channels.cache.get(originalChannel.id).delete())
    .catch(console.error);

  }
}
