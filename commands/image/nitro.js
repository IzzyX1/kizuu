const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
  name: "nitro",
  category: "Image",
  cooldown: "9000",
  description: "Generate nitro for you... Just Kidding xD",
  usage: "nitro",
  permLevel: "User",
  run: async (client, message, args) => {
  
  const embed = new Discord.MessageEmbed()
  .setColor('#00a5ff')
  .setDescription(':gift: **Nitro** Generated.')
  .setImage('https://cdn.glitch.com/654af2b2-33c5-4fdf-bb3b-1a77962c394f%2FBlaringPointedInvisiblerail-size_restricted.gif?v=1589296167564')
  
  message.channel.send(embed)
  
  let jk = '8s'
  setTimeout(function(){
    message.channel.send('**Just Kidding xD**')
  }, ms(jk))
  
}
}