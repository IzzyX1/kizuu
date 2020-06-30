const { get } = require("request-promise-native");
const { MessageEmbed } = require("discord.js")
module.exports = {
  name: "pokemon",
  description: "Get any pokemon description",
  category: "Info",
  cooldown: "3",
  permLevel: "User",
  usage: "pokemon <usage>",
  run (client, message, args) {
    
    if  (!args[0]) return message.channel.send({ embed: {color: "#00a5ff", description: '<:false:725413088014106676> | Please input Pokemon name'}})

    const options = {
      url: `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=${args.join(" ")}`,
      json: true
  }
    
    message.channel.send("🗃 | Fetching Information...").then(msg => {
      get(options).then(body => {
    
        let embed = new MessageEmbed()
        .setAuthor(body.name, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.typeIcon}`)
        .setDescription(body.info.description)
        .setThumbnail(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.photo}`)
        .setColor("#00a5ff")
        .setFooter(`Weakness of pokemon - ${body.info.weakness}`, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.weaknessIcon}`)
    
        message.channel.send(embed)
        msg.delete()
      })
    })
    }
  }
