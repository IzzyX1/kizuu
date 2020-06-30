const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: 'giveaway',
  cooldown: "3",
  permLevel: "Moderator",
  category: "Moderation",
  usage: 'giveaway <time> <channel> <prize>',
  description: 'Make a giveaway',
  run: async (client, message, args) => {
    
    if (!message.member.hasPermission("MANAGE_GUILD" || "ADMINISTRATOR")) {
      return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You do not have permission to use this command."}})
    }
    
    if (!args[0]) return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | You did not specify your time!`}});
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send(
        { embed: {color: "#00a5ff", description: `<:false:725413088014106676> | You did not use the correct formatting for the time!`}}
      );
    if (isNaN(args[0][0])) return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | That is not a number!`}});
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        { embed: {color: "#00a5ff", description: `<:false:725413088014106676> | I could not find that channel in the guild!`}}
      );
    let prize = args.slice(2).join(" ");
    if (!prize) return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | No prize specified!`}});
    message.channel.send({ embed: {color: "#00a5ff", description: `<:true:725413065998336010> | Giveaway created in ${channel}`}});
    let Embed = new MessageEmbed()
      .setTitle(`New giveaway!`)
      .setDescription(
        `${message.author} is now hosting a giveaway with prize **${prize}**`
      )
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor('#00a5ff');
    let m = await channel.send(Embed);
    m.react("🎉");
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send(
          { embed: {color: "#00a5ff", description: `<:false:725413088014106676> | Not enough people reacted for me to start draw a winner!`}}
        );
      }

      let winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();
      channel.send(
        `Winner from giveaway **${prize}** is... ${winner}`
      );
    }, ms(args[0]));
  }
}
