module.exports = {
  name: 'removerole',
  category: "Moderation",
  permLevel: "Moderator",
  cooldown: "3",
  aliases: ["delrole", "deleterole"],
  description: "You can make role with this",
  usage: 'removerole <name>',
  run: async (client, message, args, color) => {
  if (!message.member.hasPermission('MANAGE_ROLES' || "ADMINISTRATOR")) return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You do not have permission to use this command."}})

    let roles = message.mentions.roles.first()
    
    if(!roles) return message.channel.send({ embed: {color: "#00a5ff", description: '<:false:725413088014106676> | Please mention a Role'}})
    
    roles.delete()
    
    message.channel.send({
      embed: {
        title: `<:true:725413065998336010> | Role Removed !`,
        description: `**${message.author.username}** removed **${roles.name}** Role`,
        color: roles.color
      }})
    
   }
}