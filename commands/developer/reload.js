const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = {
  name: "reload",
  category: "Developer",
  permLevel: "Bot Admin",
  cooldown: "3",
  aliases: ["refresh", "rl"],
  description: "Reload some command",
  usage: "reload <command>",
  run: (client, message, args, ops, level) => {

	if (!args[0]) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please provide a command to reload!"}});
  const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
	if (!command) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | That command doesn't exist. Try again."}});
	readdirSync(join(__dirname, "..")).forEach(f => {
		const files = readdirSync(join(__dirname, "..", f));
		if (files.includes(`${command.name}.js`)) {
			const file = `../${f}/${command.name}.js`;
			try {
				delete require.cache[require.resolve(file)];
				client.commands.delete(command.name);
				const pull = require(file);
				client.commands.set(command.name, pull);
				return message.channel.send({ embed: {color: "#00a5ff", description: `<:true:725413065998336010> | Successfully reloaded \`${f}/${command.name}.js\` !`}});
			}
			catch (err) {
				message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | Could not reload: ${args[0].toUpperCase()}\``}});
				return console.log(err.stack || err);
			}
		}
	})
}
}