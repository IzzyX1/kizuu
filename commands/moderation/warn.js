const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "warn",
  category: "Moderation",
  permLevel: "Moderator",
  cooldown: "3",
  usage: "warn <user> <reason>",
  description: "Warn anyone who do not obey the rules",
  run: async (client, message, args) => {
    
    if(!message.member.hasPermission("MANAGE_ROLES" || "ADMINISTRATOR")) {
      return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You do not have permission to use this command."}})
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please Mention the person to who you want to warn"}})
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You can not warn bots"}})
    }
    
    if(message.author.id === user.id) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You can not warn yourself"}})
    }
    
    if(user.id === message.guild.owner.id) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You can warn server owner"}})
    }
    
    const reason = args.slice(1).join(" ")
    
    if(!reason) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please provide reason to warn"}})
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === 3) {
      return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | ${message.mentions.users.first().username} already reached his/her limit with 3 warnings`}})
    }
    
    if(warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1)
      user.send({ embed: {color: "#00a5ff", description: `<:true:725413065998336010> | You have been warned in **${message.guild.name}** for ${reason}`}})
      await message.channel.send({ embed: {color: "#00a5ff", description: `<:true:725413065998336010> | You warned **${message.mentions.users.first().username}** for ${reason}`}})
    } else if(warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
       user.send({ embed: {color: "#00a5ff", description: `<:true:725413065998336010> | You have been warned in **${message.guild.name}** for ${reason}`}})
      await message.channel.send({ embed: {color: "#00a5ff", description: `<:true:725413065998336010> | You warned **${message.mentions.users.first().username}** for ${reason}`}})
    }
    
  
  } 
}
