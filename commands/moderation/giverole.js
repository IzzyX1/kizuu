const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "giverole",
  aliases: ["promote"],
  cooldown: "3",
  permLevel: "Moderator",
  description: "Give role to someone",
  category: "Moderation",
  usage: "giverole <user> <role>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES" || "ADMINISTRATOR")) {
      return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You do not have permission to use this command."}})
    }
    
    //if(!args[0]) {return message.channel.send('<:redtick:719865119277842492> | Please mention the member to who you want to promote')}

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
    
    if(!user) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please mention the member to who you want to Give a Role"}})
    }
    
    if(user.id === message.author.id) {
      return message.channel.send({ embed: {color: "#00a5ff", description: '<:false:725413088014106676> | You can not Give a Role to yourself'}})
    }
            
    if(!role) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please Mention Role to Give"}})
    }
        
    let roles = message.guild.roles.cache.find(x => x.id === `${role.id}`)
    
    if(!roles) {
      return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | This server do not have Role with name **${roles}**`}})
    }
            
   if(user.roles.cache.has(role.id)) {
      return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | Given user is already have **${roles}** Role`}})
    }
    
    try {
      await user.roles.add(roles)
    } catch (e) {
      return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | Error: ${e}`}})
    }
    return message.channel.send({ embed: {color: "#00a5ff", description: `<:true:725413065998336010> | You have been Give **${roles}** Role to **${message.mentions.users.first().username}**`}})    
  }
};
