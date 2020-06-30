const fetch = require('node-fetch');

module.exports = {
  name: "docs",
  usage: "docs <usage>",
  cooldown: "5",
  aliases: ["DiscordJSDocs", "D.jsDocs", "dcs"],
  description: "Gets a query for discord.js docs.",
  permLevel: "User",
  category: "Utility",
  run: async (client, message, args) => {

    const query = args.join(" ");
    
    if (!query) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | I need you to search for something on the docs!"}})
    
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`;
    fetch(url)
      .then(res => res.json())
      .then(embed => {
      if(embed && !embed.error) {        
        message.channel.send({ embed });
      } else {
        message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | I don't know mate, but "${query}" doesn't make any sense!`}});
      }
    })
      .catch(e => {
      console.error(e);
      message.channel.send({ embed: {color: "#00a5ff", description: '<:false:725413088014106676> | Darn it! I failed!'}});
    })
  }
}