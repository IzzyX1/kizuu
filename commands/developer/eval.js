const Discord = require("discord.js"),
  { post } = require("node-superfetch");

module.exports = {
  name: "eval",
  usage: "eval <code>",
  permLevel: "Bot Owner",
  cooldown: "3",
  description: "Evaluates some code with depth 1",
  category: "Developer",
  aliases: ["e", "ev"],
  run: async (client, message, args, ops, level, reaction) => {
    const embed = new Discord.MessageEmbed()
      .addField("Input", "```js\n" + args.slice(0).join(" ") + "```")
      .setFooter("React to delete message.");
    try {
      let code = args.slice(0).join(" ");
      if (!code)
        return message.channel.send({
          embed: {
            color: "#00a5ff",
            description:
              "<:false:725413088014106676> | Please include the code."
          }
        });
      let evaled;

      if (
        message.guild.me.hasPermission("MANAGE_MESSAGES" || "ADMINISTRATOR")
      ) {
        await message.react("726890996792688690");
      }

      if (
        code.includes(`SECRET`) ||
        code.includes(`TOKEN`) ||
        code.includes(`token`) ||
        code.includes(`secret`) ||
        code.includes("process.env")
      ) {
        evaled = "No, shut up, what will you do it with the token?";
      } else {
        evaled = eval(code);
      }

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, { depth: 0 });

      let output = clean(evaled);
      if (output.length > 1024) {
        const { body } = await post("https://hastebin.com/documents").send(
          output
        );
        embed
          .addField("Output", `https://hastebin.com/${body.key}.js`)
          .setColor("#00a5ff")
          .setTitle("<:true:725413065998336010> | Evaluates code");
      } else {
        embed
          .addField("Output", "```js\n" + output + "```")
          .setColor("#00a5ff")
          .setTitle("<:true:725413065998336010> | Evaluates Code");
      }

      let msg = await message.channel.send(embed);

      await msg.react("726890996792688690");
    } catch (error) {
      let err = clean(error);
      if (err.length > 1024) {
        const { body } = await post("https://hastebin.com/documents").send(err);
        embed
          .addField("Output", `https://hastebin.com/${body.key}.js`)
          .setColor("#00a5ff")
          .setTitle("<:true:725413065998336010> | Something Error");
      } else {
        embed
          .addField("Output", "```js\n" + err + "```")
          .setColor("#00a5ff")
          .setTitle("<:true:725413065998336010> | Something Error");
      }

      let msg = await message.channel.send(embed);

      await msg.react("726890996792688690");
    }
  }
};
function clean(string) {
  if (typeof text === "string") {
    return string
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
    return string;
  }
}
