const moment = require("moment")
require("moment-duration-format")

module.exports = {
  name: "shutdown",
  category: "Developer",
  permLevel: "Bot Admin",
  cooldown: "10",
  aliases: ["reboot", "rb"],
  description: "Shutdown the client",
  usage: "shutdown",
  run: async (client, message, args, ops) => {
    
    const duration = moment
      .duration(client.uptime)
      .format(" D [Days], H [Hours], m [mins], s [secs]");
    
    let reason = args.slice(0).join(" ")
    if (!reason) reason = "No reason"
    
  try {
    
    await message.channel.send({
      embed: {
        color: '#00a5ff',
        description: 'Shutting down...',
        footer: {
          text: `Reason: ${reason} | Uptime: ${duration}`
        }
      }
    })
    
    await Promise.all(client.commands.map(cmd =>
    client.unloadCommand(cmd)
    ));
    process.exit(0)
      
  } catch (e) {
    
    message.channel.send(`<:redtick:719865119277842492> | Error: ${e.message}`)
    
  }
  
}
}