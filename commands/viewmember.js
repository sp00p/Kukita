const Discord = require("discord.js")

module.exports = {
  name: "viewmember",
  description: "allows you to view a specific member's permissions",
  arguments: "<user>",
  execute(message) {

    let user = message.guild.member(message.mentions.users.first())
    let usricon = user.user.displayAvatarURL

    if (!user.hasPermission("ADMINISTRATOR")) {
      var administrator = "❌";
    } else if (user.hasPermission("ADMINISTRATOR")){
      var administrator = "✅";
    }

    if (!user.hasPermission("KICK_MEMBERS")) {
       var kick = "❌";
    } else if (user.hasPermission("KICK_MEMBERS")){
       var kick = "✅";
    }

    if (!user.hasPermission("BAN_MEMBERS")) {
       var ban = "❌";
    } else if (user.hasPermission("BAN_MEMBERS")){
       var ban = "✅";
    }

    if (!user.hasPermission("CREATE_INSTANT_INVITE")) {
        var invitecreate = "❌";
     } else if (user.hasPermission("CREATE_INSTANT_INVITE")){
        var invitecreate = "✅";
     }

    if (!user.hasPermission("MANAGE_CHANNELS")) {
       var managemessages = "❌";
    } else if (user.hasPermission("MANAGE_CHANNELS")){
       var managemessages = "✅";
    }

    if (!user.hasPermission("MANAGE_GUILD")) {
        var manageguild = "❌";
     } else if (user.hasPermission("MANAGE_GUILD")){
        var manageguild = "✅";
     }

    if (!user.hasPermission("ADD_REACTIONS")) {
       var addreaction = "❌";
    } else if (user.hasPermission("ADD_REACTIONS")){
       var addreaction = "✅";
    }

    if (!user.hasPermission("ADD_REACTIONS")) {
        var addreaction = "❌";
     } else if (user.hasPermission("ADD_REACTIONS")){
        var addreaction = "✅";
     }

    if (!user.hasPermission("VIEW_AUDIT_LOG")) {
       var auditlog = "❌";
    } else if (user.hasPermission("VIEW_AUDIT_LOG")){
       var auditlog = "✅";
    }

    if (!user.hasPermission("VIEW_AUDIT_LOG")) {
        var auditlog = "❌";
     } else if (user.hasPermission("VIEW_AUDIT_LOG")){
        var auditlog = "✅";
     }

    if (!user.hasPermission("PRIORITY_SPEAKER")) {
       var priority = "❌";
    } else if (user.hasPermission("PRIORITY_SPEAKER")){
       var priority = "✅";
    }

    if (!user.hasPermission("STREAM")) {
        var stream = "❌";
     } else if (user.hasPermission("STREAM")){
        var stream = "✅";
     }

    if (!user.hasPermission("VIEW_CHANNEL")) {
       var viewchannel = "❌";
    } else if (user.hasPermission("VIEW_CHANNEL")){
       var viewchannel = "✅";
    }

    if (!user.hasPermission("SEND_MESSAGES")) {
       var sendmsg = "❌";
    } else if (user.hasPermission("SEND_MESSAGES")){
       var sendmsg = "✅";
    }

    if (!user.hasPermission("SEND_TTS_MESSAGES")) {
       var tts = "❌";
    } else if (user.hasPermission("SEND_TTS_MESSAGES")){
       var tts = "✅";
    }

    if (!user.hasPermission("MANAGE_MESSAGES")) {
       var managemsg = "❌";
    } else if (user.hasPermission("MANAGE_MESSAGES")){
       var managemsg = "✅";
    }

    if (!user.hasPermission("EMBED_LINKS")) {
       var embed = "❌";
    } else if (user.hasPermission("EMBED_LINKS")){
       var embed = "✅";
    }

    if (!user.hasPermission("ATTACH_FILES")) {
       var attach = "❌";
    } else if (user.hasPermission("ATTACH_FILES")){
       var attach = "✅";
    }

    if (!user.hasPermission("READ_MESSAGE_HISTORY")) {
       var msghistory = "❌";
    } else if (user.hasPermission("READ_MESSAGE_HISTORY")){
       var msghistory = "✅";
    }

    if (!user.hasPermission("MENTION_EVERYONE")) {
       var everyone = "❌";
    } else if (user.hasPermission("MENTION_EVERYONE")){
       var everyone = "✅";
    }

    if (!user.hasPermission("USE_EXTERNAL_EMOJIS")) {
       var external = "❌";
    } else if (user.hasPermission("USE_EXTERNAL_EMOJIS")){
       var external = "✅";
    }

    if (!user.hasPermission("VIEW_GUILD_INSIGHTS")) {
       var insights = "❌";
    } else if (user.hasPermission("VIEW_GUILD_INSIGHTS")){
       var insights = "✅";
    }

    if (!user.hasPermission("CONNECT")) {
       var connect = "❌";
    } else if (user.hasPermission("CONNECT")){
       var connect = "✅";
    }

    if (!user.hasPermission("SPEAK")) {
       var speak = "❌";
    } else if (user.hasPermission("SPEAK")){
       var speak = "✅";
    }

    if (!user.hasPermission("MUTE_MEMBERS")) {
       var mute = "❌";
    } else if (user.hasPermission("MUTE_MEMBERS")){
       var mute = "✅";
    }

    if (!user.hasPermission("DEAFEN_MEMBERS")) {
       var deaf = "❌";
    } else if (user.hasPermission("DEAFEN_MEMBERS")){
       var deaf = "✅";
    }

    if (!user.hasPermission("MOVE_MEMBERS")) {
       var move = "❌";
    } else if (user.hasPermission("MOVE_MEMBERS")){
       var move = "✅";
    }

    if (!user.hasPermission("USE_VAD")) {
       var vad = "❌";
    } else if (user.hasPermission("USE_VAD")){
       var vad = "✅";
    }

    if (!user.hasPermission("CHANGE_NICKNAME")) {
       var changenick = "❌";
    } else if (user.hasPermission("CHANGE_NICKNAME")){
       var changenick = "✅";
    }

    if (!user.hasPermission("MANAGE_CHANNELS")) {
      var managechannels = "❌";
    } else if (user.hasPermission("MANAGE_CHANNELS")){
      var managechannels = "✅";
    }

    if (!user.hasPermission("MANAGE_NICKNAMES")) {
       var managenick = "❌";
    } else if (user.hasPermission("MANAGE_NICKNAMES")){
       var managenick = "✅";
    }

    if (!user.hasPermission("MANAGE_ROLES")) {
       var manageroles = "❌";
    } else if (user.hasPermission("MANAGE_ROLES")){
       var manageroles = "✅";
    }

    if (!user.hasPermission("MANAGE_WEBHOOKS")) {
       var manageweb = "❌";
    } else if (user.hasPermission("MANAGE_WEBHOOKS")){
       var manageweb = "✅";
    }

    if (!user.hasPermission("MANAGE_EMOJIS")) {
       var manageemoji = "❌";
    } else if (user.hasPermission("MANAGE_EMOJIS")){
       var manageemoji = "✅";
    }

    var memberEmbed = new Discord.MessageEmbed()
      .setDescription("__**Member Information**__")
      .setColor("#0x0099ff")
      .setThumbnail(user.avatar)
      .addFields(
        {name: "**Name**", value: `${user.user.username}#${user.user.discriminator}`, inline: true},
        {name: "**ID**", value: user.id, inline: true},
        {name: "**Joined**", value: user.joinedAt, inline: true},
        {name: "__**Permissions**__", value: "A list of permissions that this user has"},
        {name: "Administrator", value: administrator, inline: true},
        {name: "Kick Members", value: kick, inline: true},
        {name: "Ban Members", value: ban, inline: true},
        {name: "Create Invite", value: invitecreate, inline: true},
        {name: "Manage Channels", value: managechannels, inline: true},
        {name: "Manage Guild", value: manageguild, inline: true},
        {name: "Add Reactions", value: addreaction, inline: true},
        {name: "Audit Log Access", value: auditlog, inline: true},
        {name: "Priority Speaker", value: priority, inline: true},
        {name: "Can Stream", value: stream, inline: true},
        {name: "View Channel", value: viewchannel, inline: true},
        {name: "Send Messages", value: sendmsg, inline: true},
        {name: "TTS Access", value: tts, inline: true},
        {name: "Manage Messages", value: managemsg, inline: true},
        {name: "Embed Links", value: embed, inline: true},
        {name: "Attach Files", value: attach, inline: true},
        {name: "Read Message History", value: msghistory, inline: true},
        {name: "Mention Everyone", value: everyone, inline: true},
        {name: "Use External Emojis", value: external, inline: true},
        {name: "View Guild Insights", value: insights, inline: true},
        {name: "Connect to VC", value: connect, inline: true},
        {name: "Speak in VC", value: speak, inline: true},
        {name: "Mute Members", value: mute, inline: true},
        {name: "Deafen Members", value: deaf, inline: true},
        {name: "Move Members", value: move, inline: true},
        {name: "Change Nickname", value: changenick, inline: true},
        {name: "Manage Channels", value: managechannels, inline: true},
        {name: "Manage Nicknames", value: managenick, inline: true},
        {name: "Manage Roles", value: manageroles, inline: true},
        {name: "Manage Webhooks", value: manageweb, inline: true},
        {name: "Manage Emojis", value: manageemoji, inline: true}

      )
      .setFooter("Kukita Bot", "https://cdn.discordapp.com/attachments/731996957051977859/733879306283122758/kukita.png")
       message.channel.send(memberEmbed);
    }
}
