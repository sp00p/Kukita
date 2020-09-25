const util = require('util');
const Discord = require('discord.js');
const download = util.promisify(require('download-file'));
const tts = require('google-tts-api');

module.exports.run = async (bot, message, args) => {
  let awaiting = [];

  awaiting.push(message.author.id);
  let lang = message.content.split(" ")
  let act = lang[1];
  let toMp3 = message.content.split(" ");
  toMp3.shift();
  toMp3.shift();
  toMp3 = toMp3.join(" ");
  let member = message.guild.member(message.author);
  let nickname = member ? member.displayName : null;

  let options = {
    directory: `././audio`,
    filename: `${message.author.id}.mp3`
  }

  if (act === "en" || act === "it" || act == "hi" || act === "ru" || act === "en-US" || act === "en-UK" ){ tts(toMp3, act, 1)
      .then(url => {
        download(url, options)
          .then(() =>
            message.channel.send({
              files: [{
                attachment: `${options.directory}/${options.filename}`,
                name: `${message.author.id}.mp3`
              }]
            })
          )
          .then(msg => {
            //fs.unlink(`${options.directory}/${options.filename}`)
            removeAwaiting(message.author.id);
          })
          .catch(err => {
            console.error(err);
            removeAwaiting(message.author.id);
	    return;
          });
      })
      .catch(err => {
        return message.channel.send("Please use the correct command format!");
      });
      }
	  else {
		  removeAwaiting(message.author.id);
		  message.channel.send("Please use the correct command format!");
    }

    function removeAwaiting(id) {
      awaiting = awaiting.filter(awaiter => awaiter != id);
    }
};

module.exports.help = {
  name: "tts",
  description: "uses google's tts api to turn your text into speech. the supported accents are: en, it, ru, en-US, and en-UK",
  arguments: "<accent> <message>",
  category: "Fun",
  aliases: ["tts"]
};
