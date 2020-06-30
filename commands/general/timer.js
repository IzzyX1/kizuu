const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const { Timers } = require("../../variable");

module.exports = {
  name: "timer",
  category: "General",
  usage: "timer <time>",
  description: "Timer !",
  permLevel: "User",
  run: async (client, message, args) => {
    if (!args[0]) {
      return message.channel.send(
        { embed: {color: "#00a5ff", description: `<:false:725413088014106676> | You did not specify the amount of time you wish to set a timer for!`}}
      );
    }
    if (!args[0].endsWith("d")) {
      if (!args[0].endsWith("h")) {
        if (!args[0].endsWith("m")) {
          return message.channel.send(
            { embed: {color: "#00a5ff", description: `You did not use the proper format for the the time!`}}
          );
        }
      }
    }
    if (isNaN(args[0][0])) {
      return message.channel.send({ embed: {color: "#00a5ff", description: `That is not a number!`}});
    }
    Timers.set(message.author.id + " G " + message.guild.name, {
      Guild: message.guild.name,
      Author: {
        Tag: message.author.tag,
        ID: message.author.id,
      },
      Time: ms(args[0]),
    });
    message.channel.send(
      { embed: {color: "#00a5ff", description: `**${message.author.tag}** you have set a timer for **${args[0]}** (\`${ms(
        args[0]
      )} ms\`)`}}
    );
    setTimeout(() => {
      let Embed = new MessageEmbed()
        .setTitle(`Timer finished in server ${message.guild.name}`)
        .setDescription(
          `Your timer for ${args[0]} (\`${ms(args[0])} ms\`) has finished!`
        )
        .setColor('#00a5ff');
      message.author.send(Embed);
      Timers.delete(message.author.id + " G " + message.guild.name);
    }, ms(args[0]));
  }
}