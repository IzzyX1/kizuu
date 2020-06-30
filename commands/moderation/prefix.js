const db = require("quick.db")
const { default_prefix } = require("../../config.js")

module.exports = {
  name: "prefix",
  category: "Moderation",
  cooldown: "3",
  usage: "prefix <usage>",
  permLevel: "Administrator",
  description: "Change the guild prefix",
  run: async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You do not have permission to use this command."}})
    }
    
    if(!args[0]) {
      db.delete(`prefix_${message.guild.id}`)
      return await message.channel.send({ embed: {color: "#00a5ff", description: "<:true:725413065998336010> | Reseted Prefix"}})
    } 
    
    if(args[1]) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You can not set prefix a double argument"}})
    }
    
    if(args[0].length > 5) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You can not send prefix more than 5 characters"}})
    }
    
    if(args.join("") === default_prefix) {
      db.delete(`prefix_${message.guild.id}`)
     return await message.channel.send({ embed: {color: "#00a5ff", description: "<:true:725413065998336010> | Reseted Prefix"}})
    }
    
    db.set(`prefix_${message.guild.id}`, args[0])
  await message.channel.send({ embed: {color: "#00a5ff", description: `<:true:725413065998336010> | Seted Bot Prefix to ${args[0]}`}})
    
  }
}
