module.exports.run = (bot, message,args) => {
  if(!message.member.hasPermission("MANAGE_CHANNELS", "ADMINISTRATOR")) return message.channel.send("You have to have the MANAGE_CHANNELS or ADMINISTRATOR permission to use this command!😞");{
    if(!args[1]) return message.channel.send("Please specify the duration for slowmode!")
    if(isNaN(args[1])) return message.channel.send("Please provide a number!")
    message.channel.setRateLimitPerUser(args[1])
    if (parseInt(args[1]) > 0) {
      message.channel.send("Successfully enabled slowmode!")
    } else {
      message.channel.send("Successfully disabled slowmode!")
    }
  }
}

module.exports.help = {
  name: "slowmode",
  description: "sets slowmode for the current channel",
  arguments: "<time>",
  category: "Moderation",
  aliases: ["slomode", "sm"]
};
