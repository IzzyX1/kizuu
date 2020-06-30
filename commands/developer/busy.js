const Discord = require("discord.js")
const config = require("../../config.js")
const db = require("quick.db")

module.exports = {
  name: "busy",
  category: "Developer",
  permLevel: "Bot Owner",
  usage: "busy",
  cooldown: "3",
  description: "On/Off Busy Announcement from mentioning you",
  run: async (client, message, args, ops, level) => {
    
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
   if(prefix == null) {
    prefix =  client.config.DEFAULT_PREFIX
  }
          
    let busy = await db.fetch(`busy_${ops.ownerID}`)
    
    if (busy === "Not") {
      db.set(`busy_${ops.ownerID}`, "Busy") 
      let embed = new Discord.MessageEmbed()
      .setColor('#00a5ff')
      .setTitle(`${client.users.cache.get(ops.ownerID).username} is now busy.`)
      .setTimestamp()
      
      message.channel.send(embed)
    } else if (busy === "Busy") {
       db.set(`busy_${ops.ownerID}`, "Not") 
      let embed = new Discord.MessageEmbed()
      .setColor('#00a5ff')
      .setTitle(`${client.users.cache.get(ops.ownerID).username} is now free.`)
      .setTimestamp()
      
      message.channel.send(embed)
    } else {
       db.set(`busy_${ops.ownerID}`, "Busy") 
      let embed = new Discord.MessageEmbed()
      .setColor('#00a5ff')
      .setTitle(`${client.users.cache.get(ops.ownerID).username} is now busy.`)
      .setTimestamp()
      
      message.channel.send(embed)
            
    }
  }
}


