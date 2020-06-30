const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "uptime",
  category: "Developer",
  cooldown: "3",
  permLevel: "Bot Admin",
  description: "Show My uptime",
  usage: "uptime",
  run: async (client, message, args, ops) => {

    const duration = moment
      .duration(client.uptime)
      .format(" D [Days], H [Hours], m [mins], s [secs]");
    
    const embed = new Discord.MessageEmbed()
      .setColor("#00a5ff")
      .setTitle(`Bot Uptime: ${duration}`)
      .setTimestamp()
      .setFooter("Thanks for support");

    message.channel.send(embed);
  }
};
