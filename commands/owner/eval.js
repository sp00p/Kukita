const { MessageEmbed } = require('discord.js');
const beautify = require("beautify");

module.exports.run =  async (bot, message, args) => {
  if (!bot.config.owners.includes(message.author.id)) return;

  const toEval = args.join(" ");
  const evaluated = eval(toEval);

  try{
    if (args.join(" ").toLowerCase().includes("token")) {
      return;
    }

    let evalEmbed = new MessageEmbed()
      .setColor("#00FF00")
      .setTimestamp()
      .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
      .setTitle("Eval")
      .addFields(
        {name: "To evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``},
        {name: "Evaluated: ", evaluated},
        {name: "Type of: " typeof(evaluated)};
      )

      message.channel.send(evalEmbed);
    } catch (err) {
      let errorEmbed = new MessageEmbed()
        .setColor("#FF0000")
        .setTitle("\❌ Error!")
        .setDescription(e)
        .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")

        message.channel.send(errorEmbed)
    }
}

module.exports.help = {
  name: "eval",
  description: "evaluates given command",
  arguments: "<command>",
  category: "Owner",
  aliases: ["eval"]
}
