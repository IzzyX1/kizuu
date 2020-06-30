module.exports = {
  name: "setusername",
  permLevel: "Bot Owner",
  description: "Change the Bot username",
  usage: "setusername <usage>",
  cooldown: "60",
  category: "Developer",
  run: async (client, message, args, ops) => {

    if (!args[0])
      return message.channel.send(
        { embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please input new username"}}
      );

    if (args.join(" ").length >= 1) {
      try {
      await client.user.setUsername(args.join(" "));
    } catch (e) {
      return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | Error: ${e}`}})
    }
      return message.channel.send({
          embed: {
            color: "#00a5ff",
            description: `My username is now set to ${args.join(" ")}`,
            timestamp: new Date()
          }
        })
    }
    }
};
