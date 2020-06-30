const discord = require("discord.js");

module.exports = {
  name: "ban",
  cooldown: "3",
  category: "Moderation",
  permLevel: "Moderator",
  description: "Ban anyone with one shot whithout knowing anyone xD",
  usage: "ban <user> <reason>",
  run: async (client, message, args, ops) => {
    
    if(!message.member.hasPermission("BAN_MEMBERS" || "ADMINISTRATOR")) {
      return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You do not have permission to use this command."}})
    }
            
    const target = message.mentions.members.first()
    
    if(!target) {
      return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | Please mention the person who you want to ban.`}})
    }
    
    if(target.id === message.author.id) {
      return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | You can not ban yourself!`}})
    }
    
    if(!target.bannable) {
      return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | I can not ban he/she.`}})
    }
    
    const reason = args.slice(1).join(" ");
    
   if(!reason) {
     return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | Please Give Reason To ban Member`}})
   }
    
    let embed = new discord.MessageEmbed()
    .setTitle("Action : Ban")
    .setDescription(`Banned ${target} (\`${target.id}\`)`)
    .setColor("#00a5ff")
    .setFooter(`Banned by ${message.author.tag}`);
    
    message.channel.send(embed)
    target.ban(reason)
    
    
    
  }
}
