const { get } = require("request-promise-native");
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "anime",
  category: "Info",
  permLevel: "User",
  cooldown: "3",
  aliases: ["kitsu"],
  description: "Get anime information",
  usage: "anime <animeName>",
  run: (client, message, args) => {
    
    
    
    if(!args.length) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please input Anime name"}})
    }
    
    let option = {
      url: `https://kitsu.io/api/edge/anime?filter[text]=${args.join(" ")}`,
      method: `GET`,
      headers: {
        'Content-Type': "application/vnd.api+json",
        'Accept': "application/vnd.api+json"

      },
      json: true
    }
    
    
    message.channel.send("🗃️ | Fetching The Info...").then(msg => {
      get(option).then(body => {
       try {
        let embed = new MessageEmbed()
        .setTitle(body.data[0].attributes.titles.en_jp)
        .setColor("#00a5ff")
        .setImage(body.data[0].attributes.coverImage.large)
        .setDescription(body.data[0].attributes.synopsis)
        .setThumbnail(body.data[0].attributes.posterImage.original)
        .addField("Ratings", body.data[0].attributes.averageRating)
        .addField("TOTAL EPISODES", body.data[0].attributes.episodeCount)
        
        
        message.channel.send(embed)
        msg.delete();
        
       } catch (err) {
        msg.delete();
         return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Unable to find this anime"}});
       }
        
        
        
      }                 
                       
    )})
    
  }

}
