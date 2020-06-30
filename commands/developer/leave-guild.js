module.exports = {
  name: "leave-guild",
  category: "Developer",
  usage: "leave-guild",
  description: "Bye.",
  permLevel: "Bot Owner",
  run: async (client, message, args) => {
    
    message.channel.send("Bye.")
    
    message.guild.leave()
    
  }
}