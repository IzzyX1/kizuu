 
const Discord = require("discord.js");
const { MessageEmbed } = require ("discord.js"); 

module.exports =  {
  name: "rename",
  category: "Moderation",
  permLevel: "Moderator",
  aliases: ["nick"],
  cooldown: "5",
  description: "Change name mentioned",
  usage: "rename <mention> <new-name>",
  run: async (client, message, args) => {
      
  if (!message.member.hasPermission(["MANAGE_NICKNAMES", "ADMINISTRATOR"])) {
    return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You do not have permission to use this command."}})
  }
  
  let user = message.mentions.users.first();
  if (!user) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please mention user to change his nick"}})
  
  let nick = args.slice(1).join(" ");
  if (!nick) nick = user.username
  
  let member = message.guild.members.cache.get(user.id);
  
    try {
      await member.setNickname(nick)
    } catch (e) {
      return message.channel.send({embed: {color: "#00a5ff", description: `<:false:725413088014106676> | Error: ${e}`}})
    }
    return message.channel.send({embed: {color: "#00a5ff", description: `<:true:725413065998336010> | Successfully changed **${user.tag}** nickname to **${nick}**`}});
  }
}