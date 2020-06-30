const db = require("quick.db")

module.exports = {
  name: "warnings",
  aliases: ["warns"],
  cooldown: "3",
  usage: "warnings [user]",
  description: "Get the warnings of yours or mentioned user",
  category: "Moderation",
  permLevel: "Moderator",
  run: (client, message, args) => {
    
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
  
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    
    
    if(warnings === null) warnings = 0;
    
    
    message.channel.send(`${user} have **${warnings}** warning(s)`)
  
  
  }
}
