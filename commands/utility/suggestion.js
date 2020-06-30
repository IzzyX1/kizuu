const Discord = require("discord.js")

module.exports = {
  name: "suggestion",
  category: "Utility",
  permLevel: "User",
  aliases: ["suggest"],
  usage: "suggestion [message]",
  cooldown: "30",
  description: "Give advice to my Developer",
  run: async (client, message, args, ops) => {
    
    let note = args.slice(0).join(" ");
    if (!args[0]) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | If there are no suggestions, don't use this command."}})
    
    client.channels.cache.get("724534986300194880").send({
      embed: {
        title: "Suggestion !!",
        color: "#00a5ff",
        thumbnail: {
          url: message.author.displayAvatarURL()
        },
        description: "Hey, <@&723792702004658256>\nsomeone give us advice.",
        fields: [
          {
            name: "Advice provider: ",
            value: `${message.author.tag} (\`${message.author.id}\`)`
          },
          {
            name: "Suggestion: ",
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
        description: `Thank you for giving advice.\nyour advice is now sended to my Developer.`,
        fields: {
          name: "Suggestion: ",
          value: note + "."
        },
        timestamp: new Date(),
      }
    })
    
  }
}