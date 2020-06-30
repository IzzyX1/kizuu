const Discord = require("discord.js");

module.exports = {
  name: "invite",
  description: "Invite me to your server.",
  usage: "invite",
  permLevel: "User",
  cooldown: "3",
  category: "Utility",
  run: async (client, message, args, ops) => {
    
    message.channel.send({
      embed: {
        color: "#00a5ff",
        fields: [
        {
          name: `${client.user.username} with administrator perms`,
          value: "[Click Here !](https://discordapp.com/oauth2/authorize?client_id=725004301478395944&scope=bot&permissions=8)"
        },
        {
          name: `${client.user.username} with no perms`,
          value: "[Click Here !](https://discordapp.com/oauth2/authorize?client_id=725004301478395944&scope=bot&permissions=0)",
          inline: false,
        },
        {
          name: `${client.user.username} with custom perms`,
          value: "[Click Here !](https://discordapp.com/oauth2/authorize?client_id=725004301478395944&scope=bot&permissions=2146958847)",
          inline: false,
        },
        {
          name: `${ops.dev} Support Server`,
          value: "[Click Here !](https://discord.gg/Y8RUsAX)",
          inline: false,
        }],
        timestamp: new Date(),
        footer: {
          text: `Requested by ${message.author.username}`
        }
      }
    })
  }
};
