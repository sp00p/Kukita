module.exports = {
  name: "inviteme",
  description: "sends an oath link so you can invite me to your server",
  arguments: "none",
  execute(message) {
    message.author.send("As you requested, here's my OAuth link! https://discord.com/api/oauth2/authorize?client_id=714758633702948905&permissions=8&scope=bot")
  }
}
