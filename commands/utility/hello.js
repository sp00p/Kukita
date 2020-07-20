module.exports.run = (bot, message,args) => {

    message.channel.send("Hello!😊");
};

module.exports.help = {
  name: "hello",
  description: "a test command",
  arguments: "",
  category: "Utility",
  aliases: ["hi", "hey"]
};
