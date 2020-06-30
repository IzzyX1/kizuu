module.exports = {
  name: "send",
  usage: "send <@user/id> <usage>",
  description: "Send a message to someone via DM",
  aliases: ["sendmessage", "dm", "sm"],
  cooldown: "3",
  permLevel: "Bot Support",
  category: "Developer",
  run: async (client, message, args, level) => {
              
      var user;
      user = message.mentions.users.first() || client.users.cache.get(args[0])
      if (!user) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please Give receiver"}})
    
      let msg = args.slice(1).join(" ")
      if (!msg) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Nothing to send?"}})
    
      message.delete({ timeout: 0 })
      
      try {
        await client.users.cache.get(user.id).send(`${msg} - ${message.author.username}`)
      } catch (e) {
        return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | Error: ${e}`}})
      }
    return message.channel.send({ embed: {color: "#00a5ff", description: "<:true:725413065998336010> | Message Sended to " + user.tag}}).then(message => message.delete({ timeout: 4000 }))
  }
}