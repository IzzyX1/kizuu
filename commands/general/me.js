const Discord = require("discord.js");

module.exports = {
  name: "me",
  permLevel: "User",
  category: "General",
  cooldown :"5",
  description: "Say something.",
  usage: "me <message>",
  run: async (client, message, args) => {
    let me = args.join(" ");

    if (!args.join(" "))
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Nothing to say?"}});

    message.delete();

    message.channel.send(`**[${message.author.username}]** ${me}`);
  }
};
