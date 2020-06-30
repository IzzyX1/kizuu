const Discord = require("discord.js");

module.exports = {
  name: "help",
  usage: "help [command]",
  category: "General",
  cooldown: "3",
  permLevel: "User",
  description: "Displays my list of commands.",
  aliases: ["h", "?", "halp"],
  run: (client, message, args, ops, level) => {
    if (!args[0]) {
      const myCommands = message.guild
        ? client.commands.filter(
            cmd => client.levelCache[cmd.permLevel] <= level
          )
        : client.commands.filter(
            cmd => client.levelCache[cmd.permLevel] <= level
          );

      const commandNames = myCommands.keyArray();
      const longest = commandNames.reduce(
        (long, str) => Math.max(long, str.length),
        0
      );

      let currentCategory = "";
      let output = `My prefix on this server is \`${ops.prefix}\`\n`;
      const sorted = myCommands
        .array()
        .sort((p, c) =>
          p.category > c.category
            ? 1
            : p.name > c.name && p.category === c.category
            ? 1
            : -1
        );
      sorted.forEach(c => {
        const cat = c.category;
        if (currentCategory !== cat) {
          output += `\n\n **${cat}** \n`;
          currentCategory = cat;
        }
        output += `\`${c.name}\`, `;
      });

      const embed = new Discord.MessageEmbed()
        .setColor("#00a5ff")
        .setTitle(`${client.user.username} Commands List`)
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setFooter(
          `For more information try ${ops.prefix}help (command), ex: ${ops.prefix}help ping`
        )
        .setDescription(output);

      message.channel.send({ embed });
    } else {
      let command = args[0];
      if (client.commands.has(command)) {
        command = client.commands.get(command);
        if (level < client.levelCache[command.permLevel]) return;

        let usage = command.usage;
        if (!usage) usage = "-";
        let description = command.description;
        if (!description) description = "-";
        let aliases = command.aliases;
        if (!aliases) aliases = "-";
        let cooldown = command.cooldown;
        if (!cooldown) cooldown = "0";

        const embed = new Discord.MessageEmbed()
          .setColor("#00a5ff")
          .setThumbnail(client.user.displayAvatarURL())
          .setTitle("Command Information")
          .addField("Aliases", `${aliases}`)
          .addField("Usage", `${usage}`)
          .addField("Cooldown", `${cooldown} second(s)`)
          .addField("Perm Level", `${command.permLevel}`)
          .addField("Description", `${description}`);

        message.channel.send({ embed });
      }
    }
  }
};
