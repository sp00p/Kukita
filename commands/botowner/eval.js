const { MessageEmbed } = require('discord.js');
const beautify = require("beautify");
const { inspect } = require("util");

module.exports.run =  async (bot, message, args) => {
  if (!bot.config.owners.includes(message.author.id)) return;

  const toEval = `(async () => {${args.join(" ")}})()`
  const evaluated = await eval(toEval)

  try{
    if (args.join(" ").toLowerCase().includes("token")) {
      return;
    }

    let evalEmbed = new MessageEmbed()
      .setColor("#00FF00")
      .setTimestamp()
      .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
      .setTitle("Eval")
      .addField("To evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``)
      .addField("Evaluated: ", `\`\`\`js\n${beautify(inspect(evaluated,{depth: 0}), { format: "js"})}\n\`\`\``)
      .addField("Type of: ", `\`\`\`js\n${beautify(typeof evaluated, { format: "js"})}\n\`\`\``)

      message.channel.send(evalEmbed);
    } catch (err) {
      let errorEmbed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle("\❌ Error!")
        .setDescription(err)
        .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")

        if (err) return message.channel.send(errorEmbed)
    }
}

module.exports.help = {
  name: "eval",
  description: "evaluates given command",
  arguments: "<command>",
  category: "Owner",
  aliases: ["eval"]
}
