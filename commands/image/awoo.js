const { NekoBot } = require("nekobot-api")
const api = new NekoBot()
const Discord = require("discord.js")

module.exports = {
  name: "awoo",
  category: "Image",
  permLevel: "User",
  cooldown: "10",
  description: "get a awoo of someone",
  usage: "awoo [mention]",
  run: async (client, message, args, level) => {
        
    let user = message.mentions.users.first()
    if (!user) user = message.author
        
    message.channel.startTyping(3)
    
    let image = await api.imageGen.awooify(user.displayAvatarURL({ format: "png", size: 4096}))
    
    const attachment = new Discord.MessageAttachment(image, "awoo.png")
        
    message.channel.stopTyping(true)
    
    message.channel.send(attachment)          
  }
};
