const Discord = require("discord.js")

module.exports = {
  name: "support",
  category: "Utility",
  permLevel: "User",
  usage: "support [message]",
  cooldown: "86400",
  description: "Support my Developer",
  run: async (client, message, args, ops) => {
    
    let note = args.slice(0).join(" ");
    if (!args[0]) note = `Keep spirit, in developing ${client.user.username} 🔥`
    
    client.channels.cache.get("723788524121358348").send({
      embed: {
        title: "Support !!",
        color: "#00a5ff",
        thumbnail: {
          url: message.author.displayAvatarURL()
        },
        description: "Hey, <@&723792702004658256>\nsomeone has supported us.",
        fields: [
          {
            name: "Supporter: ",
            value: `${message.author.tag} (\`${message.author.id}\`)`
          },
          {
            name: "Message: ",
            value: note + "."
          }
        ],
        timestamp: new Date(),
      }
    })
    
    message.channel.send({
      embed: {
        title: `Hey, ${message.author.username}`,
        color: "#00a5ff",
        thumbnail: {
          url: client.user.displayAvatarURL()
        },
        description: `Thanks for your support.\nyour support message is now sended to my Developer.`,
        fields: {
          name: "Message: ",
          value: note + "."
        },
        timestamp: new Date(),
      }
    })
    
  }
}