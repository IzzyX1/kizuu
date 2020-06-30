const Discord = require("discord.js");
const { version } = require("../../config.js");
const moment = require("moment")
require("moment-duration-format")

module.exports = {
  name: "info",
  category: "General",
  usage: "info",
  cooldown: "3",
  aliases: ["stats", "stat"],
  permLevel: "User",
  description: "Let you know about me",
  run: (client, message, args, ops) => {
    
    const duration = moment
    .duration(client.uptime)
    .format(" D [Days], H [Hours], m [mins], s [secs]");
        
    const embed = new Discord.MessageEmbed()
      .setColor("#00a5ff")
      .setTitle(`${client.user.username} Info`)
      .setThumbnail(`${client.user.displayAvatarURL()}`)
      .setDescription(`Use ${ops.prefix}help to see commands!`)
      .addField(
        "General Information",
        `・ Guilds: ${client.guilds.cache.size}\n・ Channels: ${client.channels.cache.size}\n・ Users: ${client.users.cache.size}`
      )
      .addField(
        "Memory Usage Information",
        `・ ${(process.memoryUsage().rss / 1024 / 1024).toFixed(
          2
        )} MB RSS\n・ ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
          2
        )} MB Heap`
      )
      .addField(
        "Bot Information",
        `・ Bot version: v${version}\n・ Discord.js: v${
          Discord.version
        }\n・ Node.js: ${process.version}\n・ Websocket: ${Math.round(
          client.ws.ping
        )}ms\n・ Uptime: ${duration}`
      )
      .setFooter(`Developer: ${ops.dev} | Thanks for support`);

    message.channel.send(embed);
  }
};
