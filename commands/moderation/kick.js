const discord = require("discord.js");

module.exports = {
  name: "kick",
  category: "Moderation",
  permLevel: "Moderator",
  cooldown: "3",
  description: "Kick anyone with one shot xD",
  usage: "kick <user> <reason>",
  run: (client, message, args) => {
    
    if(!message.member.hasPermission("KICK_MEMBERS" || "ADMINISTRATOR")) {
      return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You do not have permission to use this command."}})
    }
        
    let target = message.mentions.members.first()
    
    if(!target) {
      return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | Please mention the person who you want to kick`}})
    }
    
    if(target.id === message.author.id) {
     return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | You can not kick yourself`}})
    }
    
    if(!target.kickable) {
      return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | I can not ban he/she.`}})
    }
    
    const reason = args.slice(1).join(" ");
    
    if(!reason) {
      return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | Please Give Reason to kick`}})
    }
    
    let embed = new discord.MessageEmbed()
    .setTitle("Action: Kick")
    .setDescription(`Kicked ${target} (\`${target.id}\`)`)
    .setColor("#00a5ff")
    .setFooter(`Kicked by ${message.author.username}`);
    
    message.channel.send(embed)
    
    target.kick(reason);
    
    
    
  }
}
