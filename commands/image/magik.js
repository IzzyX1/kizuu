const { NekoBot } = require("nekobot-api")
const api = new NekoBot()
const Discord = require("discord.js")

module.exports = {
  name: "magik",
  category: "Image",
  permLevel: "User",
  cooldown: "35",
  description: "get a magik of someone",
  usage: "magik [mention]",
  run: async (client, message, args, level) => {
        
    let user = message.mentions.users.first()
    if (!user) user = message.author
        
    message.channel.startTyping(3)
    
    let image = await api.imageGen.magik(user.displayAvatarURL({ format: "png", size: 4096}), 3)
    
    const attachment = new Discord.MessageAttachment(image, "magik.png")
        
    message.channel.stopTyping(true)
    
    message.channel.send(attachment)          
  }
};
