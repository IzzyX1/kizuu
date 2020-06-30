module.exports = {
  name: "say",
  category: "Developer",
  cooldown: "3",
  permLevel: "Bot Support",
  description: "Say something.",
  usage: "say <message>",
  run: async (client, message, args, ops) => {

    if (!args.join(" ")) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Nothing to say?"}});

    message.delete({ Timeout: 0 });

    message.channel.send(args.join(" "));
  }
}