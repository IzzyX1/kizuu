const discord = require("discord.js")
const Anime = require('anime-scraper').Anime


module.exports = {
  name: "scrap",
  description: "Scrap any anime direct link from gogoanime",
  category: "Info",
  cooldown: "3",
  permLevel: "User",
  usage: "scrap <animeName> | <episode>" ,
  run: async (client, message, args) => {
    
    const cmd = args.join(" ").split(' | ');
    
    if(!cmd[0]) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please input Anime name"}})
    }
    
    if(!cmd[1]) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please input Anime episode number"}})
    }
    
    let msg = await message.channel.send("🗃 | Fetching information...")
    Anime.fromName(cmd[0]).then(function (anime) {
        anime.episodes[cmd[1]-1].fetch().then(function (episode) {
          
    let embed = new discord.MessageEmbed()
    .setTitle(`SCRAP - ${anime.name}`)
    .setColor("#00a5ff")
    .addField('Download:', `[LINK](${episode.videoLinks[0].url})\n\u200B`, true)
    .setFooter(`Requested by: ${message.author.username}`)
    .setTimestamp()
    
    message.channel.send(embed)
  
  msg.delete()
    
  })
})
    
  }
}
