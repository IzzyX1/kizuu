const db = require("quick.db")

module.exports = {
  name: "resetwarns",
  category: "Moderation",
  permLevel: "Moderator",
  cooldown: "3",
  aliases: ["rwarns", "rwarn", "resetwarn"],
  usage: "rwarns <user>",
  description: "Reset warnings of mentioned person",
  run: async (client, message, args) => {
    
    
    if(!message.member.hasPermission("MANAGE_ROLES" || "ADMINISTRATOR")) {
      return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You do not have permission to use this command."}})
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
    return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please mention the person whose warning you want to reset"}})
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Bot are not allowed to have warnings"}})
    }
    
    if(message.author.id === user.id) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You are not allowed to reset your warnings"}})
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    if(warnings === null) {
      return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | ${message.mentions.users.first().username} do not have any warnings`}})
    }
    
    db.delete(`warnings_${message.guild.id}_${user.id}`)
    user.send({ embed: {color: "#00a5ff", description: `<:true:725413065998336010> | Your all warnings are reseted by ${message.author.username} from ${message.guild.name}`}})
    await message.channel.send({ embed: {color: "#00a5ff", description: `<:true:725413065998336010> | Reseted all warnings of ${message.mentions.users.first().username}`}})
    
  
    
}
}
