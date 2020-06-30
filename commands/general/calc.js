const math = require("mathjs");
const Discord = require("discord.js");

module.exports = {
  name: "calc",
  category: "General",
  permLevel: "User",
  cooldown: "3",
  description: "let's count!",
  usage: "calc <usage>",
  aliases: ["calculator", "math", "mathematic"],
  run: (client, message, args) => {
    if (!args[0]) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please input a calculation."}});

    let resp;

    try {
      resp = math.evaluate(args.join(" "));
    } catch (e) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Sorry, please input a valid calculation."}});
    }

    const embed = new Discord.MessageEmbed()
      .setColor("#00a5ff")
      .setTitle("Math Calculation")
      .addField("Input", `\`\`\`js\n${args.join(" ")}\`\`\``)
      .addField("Output", `\`\`\`js\n${resp}\`\`\``);

    message.channel.send(embed);
  }
};
