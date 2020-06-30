const Discord = require("discord.js")

module.exports = {
  name: "bugreport",
  category: "Utility",
  permLevel: "User",
  usage: "bugreport [message]",
  cooldown: "30",
  description: "Report bugs that happened to me",
  run: async (client, message, args, ops) => {
    
    let note = args.slice(0).join(" ");
    if (!args[0]) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | If there are no bugs to report, don't use this command."}})
    
    client.channels.cache.get("724534850417066038").send({
      embed: {
        title: "Bug Report !!",
        color: "#00a5ff",
        thumbnail: {
          url: message.author.displayAvatarURL()
        },
        description: "Hey, <@&723792702004658256>\nsomeone reported a bug.",
        fields: [
          {
            name: "Reporter: ",
            value: `${message.author.tag} (\`${message.author.id}\`)`
          },
          {
            name: "Bug: ",
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
        description: `Thank you for your concern.\nyour bug report is now sended to my Developer.`,
        fields: {
          name: "Bug: ",
          value: note + "."
        },
        timestamp: new Date(),
      }
    })
    
  }
}