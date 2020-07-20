module.exports = {
  name: "slowmode",
  description: "sets slowmode for the current channel",
  arguments: "<time>",
  execute(message, args) {
    if(message.member.hasPermission("MANAGE_CHANNELS", "ADMINISTRATOR")) {
      if(!args[1]) return message.channel.send("Please specify the duration for slowmode!")
      if(isNaN(args[1])) return message.channel.send("Please provide a number!")
      message.channel.setRateLimitPerUser(args[1])
      if (parseInt(args[1]) > 0) {
        message.channel.send("Successfully enabled slowmode!")
      } else {
        message.channel.send("Successfully disabled slowmode!")
      }
    } else {
      message.reply("You have to have the MANAGE_CHANNELS or ADMINISTRATOR permission to use this command!😞");
    }
  }
}
