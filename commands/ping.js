module.exports = {
  name: 'ping',
  description: 'gets your latency',
  arguments: 'none',
  execute(message, bot) {
    message.channel.send("Pinging...").then((m => {
      let ping = m.createdTimestamp - message.createdTimestamp;
      m.edit(`Bot latency: ${ping}, API Latency: ${Math.round(bot.ws.ping)}`)
    });
  }
};
