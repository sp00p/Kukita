module.exports.run = (bot, message,args) => {
    if (message.member.hasPermission("MANAGE_MESSAGES", "ADMINISTRATOR")) {

    let num = parseInt(args[1]);

    if (num > 100) return message.reply("Please enter a number less than or equal to 100");

    message.channel.messages.fetch({ limit: num}).then(messages => {
      message.channel.bulkDelete(messages).then(deleted => {
        message.reply(`${deleted.size} messages have been successfully deleted!`).then(message => message.delete());
      })
    })
  } else {
    message.reply("You have to have the MANAGE_MESSAGES or ADMINISTRATOR permission to use this command!😞");
  }
}

module.exports.help = {
  name: "purge",
  description: "deletes a set amount of messages",
  arguments: "<number between 1 and 99>",
  category: "Moderation",
  aliases: ["purge"]
};
