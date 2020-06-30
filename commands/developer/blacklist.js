const Discord = require("discord.js")
const config = require("../../config.js")
const db = require("quick.db")

module.exports = {
  name: "blacklist",
  aliases: ["bl"],
  category: "Developer",
  permLevel: "Bot Admin",
  cooldown: "60",
  usage: "blacklist <user>",
  description: "Blacklist somebody from me!",
  run: async (client, message, args, ops, level) => {
    
  let prefix = await db.fetch(`prefix_${message.guild.id}`)
   if(prefix == null) {
    prefix =  client.config.DEFAULT_PREFIX
  }
      
    const user = message.mentions.users.first() || client.users.cache.get(args[0])
    if (!user) return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please mention someone"}})
    if (user.id === ops.ownerID) return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Hey, hey... What are you want to do with Blacklisted my Creator?"}})
    if (user.id === message.author.id) return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You can not blacklist yourself"}})
    
    let blacklist = await db.fetch(`blacklist_${user.id}`)
    
    if (blacklist === "Not") {
      db.set(`blacklist_${user.id}`, "Blacklisted") 
      let embed = new Discord.MessageEmbed()
      .setColor('#00a5ff')
      .setDescription(`${user} has been blacklisted!`)
      .setTimestamp()
      
      message.channel.send(embed)
    } else if (blacklist === "Blacklisted") {
       db.set(`blacklist_${user.id}`, "Not") 
      let embed = new Discord.MessageEmbed()
      .setColor('#00a5ff')
      .setDescription(`${user} has been unblacklisted!`)
      .setTimestamp()
      
      message.channel.send(embed)
    } else {
       db.set(`blacklist_${user.id}`, "Blacklisted") 
      let embed = new Discord.MessageEmbed()
      .setColor('#00a5ff')
      .setDescription(`${user} has been blacklisted!`)
      .setTimestamp()
      
      message.channel.send(embed)
    }
  }
}
