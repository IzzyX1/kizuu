const db = require("quick.db")
const { default_prefix } = require("../../config.js")

module.exports = {
  name: "guild-prefix",
  category: "Developer",
  permLevel: "Bot Admin",
  cooldown: "3",
  aliases: ["gprefix"],
  usage: "guildprefix <usage>",
  description: "Change the guild prefix by ID",
  run: async (client, message, args, ops) => {
    
    if(!args[0]) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please give me guild id"}})
    }
    
    if(!args[1]) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please give the prefix that you want to set"}})
    } 
    
    if(args[1].length > 5) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You can not send prefix more than 3 characters"}})
    }
    
    if(args[1] === default_prefix) {
      db.delete(`prefix_${args[0]}`)
     return await message.channel.send({ embed: {color: "#00a5ff", description: "<:true:725413065998336010> | Reseted Prefix"}})
    }
    
    db.set(`prefix_${args[0]}`, args[1])
  await message.channel.send({ embed: {color: "#00a5ff", description: `<:true:725413065998336010> | Seted Bot Prefix at (${args[0]}) to ${args[1]}`}})
    
  }
}
