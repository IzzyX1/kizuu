module.exports = {
  name: 'createrole',
  category: "Moderation",
  cooldown: "3",
  permLevel: "Moderator",
  aliases: ["addrole"],
  description: "You can make role with this",
  usage: 'createrole <#color> <name>',
  run: async (client, message, args, color) => {
  if (!message.member.hasPermission('MANAGE_ROLES' || "ADMINISTRATOR")) return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You do not have permission to use this command."}})
    
    if(!args[0]) return message.channel.send({ embed: {color: "#00a5ff", description: '<:false:725413088014106676> | Please input Role color'}});
    
    if(!args[1]) return message.channel.send({ embed: {color: "#00a5ff", description: '<:false:725413088014106676> | Please input Role name'}})
    
   var hex = args[0]
    
   message.guild.roles.create({
     data: {
       name: args.slice(1).join(' '),
       color: hex
     }}).then((role) => {
     message.channel.send({
       embed: {
         title: `<:true:725413065998336010> | Role Created !`,
         description: `**${message.author.username}** created **${role.name}** Role`,
         color: role.color
       }})
   
   })
}}