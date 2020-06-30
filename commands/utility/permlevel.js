module.exports = {
  name: "permlevel",
  usage: "permlevel",
  aliases: ["pl"],
  description: "Tells you your permission level for the current message location.",
  category: "Utility",
  cooldown: "3",
  permLevel: "User",
  run: async (client, message, args, level) => {
    
    const Discord = require("discord.js");
        
    let Name = "No Name"
        
    if (message.author.permLevel === 10) Name = "Bot Owner"
    if (message.author.permLevel === 9) Name = "Bot Admin"
    if (message.author.permLevel === 8) Name = "Bot Support"
    if (message.author.permLevel === 4) Name = "Server Owner"
    if (message.author.permLevel === 3) Name = "Administrator"
    if (message.author.permLevel === 2) Name = "Moderator"
    if (message.author.permLevel === 0) Name = "User"
    
  const embed = new Discord.MessageEmbed()
    .setColor("#00a5ff")
    .setTimestamp()
    .setFooter(`Thank for support`)
    .setTitle(`Your permission level is: ${message.author.permLevel} - ${Name}`);
  
  message.channel.send(`<@${message.author.id}>`, embed);
}
}