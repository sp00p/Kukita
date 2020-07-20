module.exports.run = (bot, message,args) => {
  message.channel.send("Pinging...").then((m => {
    let ping = m.createdTimestamp - message.createdTimestamp;
    m.edit(`Bot latency: ${ping}, API Latency: ${Math.round(bot.ws.ping)}`);
  }))
};

module.exports.help = {
  name: "ping",
  description: "gets your latency",
  arguments: "",
  category: "Utility",
  aliases: [""]
};
