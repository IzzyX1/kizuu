const Discord = require("discord.js");

module.exports = {
  name: "poll",
  category: "Moderation",
  cooldown: "3",
  permLevel: "Moderator",
  description: "to discuss with other users",
  usage: "poll <usage>",
  run: async (client, message, args) => {
    message.delete({ Timeout: 0 });

    if (!message.member.hasPermission("MANAGE_GUILD" || "ADMINISTRATOR")) {
      return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You do not have permission to use this command."}})
    }

    if (!args[0]) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please input a question."}});

    const embed = new Discord.MessageEmbed()
      .setColor("#00a5ff")
      .setFooter("Reach to vote.")
      .setDescription(args.join(" "))
      .setTitle(`Poll Created By ${message.author.username}`);

    let msg = await message.channel.send(embed);

    await msg.react("725413065998336010");
    await msg.react("725413088014106676");
  }
};
