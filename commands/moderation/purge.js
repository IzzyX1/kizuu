module.exports = {
  name: 'purge',
  aliases: ['clear', 'prune'],
  category: "Moderation",
  cooldown: "3",
  permLevel: "Moderator",
  description: 'Delete some message.',
  usage: 'purge <usage>',
  run: async (client, message, args) => {
    
    if (!message.member.hasPermission("MANAGE_MESSAGES" || "ADMINISTRATOR")) 
      return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You do not have permission to use this command."}})
    if (isNaN(args[0])) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please input a valid number."}})
    if (args[0] > 100) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Insert the number less than 100."}})
    //if (args[0] < 2) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Insert the number more than 1."}})
    
    await message.delete()
    await message.channel.bulkDelete(args[0])
    .then(messages => message.channel.send({ embed: {color: "#00a5ff", description: `<:true:725413065998336010> | Deleted ${messages.size}/${args[0]} messages.`}})).then(d => d.delete({timeout: 5000}))
    .catch(() => message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Something went wrong, while deleting messages."}}))
    
  }
  
}