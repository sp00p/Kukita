module.exports = {
  name: "purge",
  description: "deletes a set amount of messages",
  arguments: "<number of messages>",
  execute(message, number) {

    let num = parseInt(number);
    message.channel.messages.fetch({ limit: num}).then(messages => {
      message.channel.bulkDelete(messages).then(deleted => {
        message.reply(`${deleted.size} messages have been successfully deleted!`).then(message => message.delete(5000));
      })
    })
  }
}
