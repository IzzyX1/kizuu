const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  fetchAllMembers: true,
  disableEveryone: true
});

const moment = require("moment");
require("moment-timezone");

client.config = require("./config.js");
client.logger = require("./handlers/Logger");
require("./handlers/functions.js")(client);

const db = require("quick.db");
let prefix = "k.";
let statuses = [
  "development",
  `prefix ${client.config.default_prefix}`]

client.levelCache = {};
for (let i = 0; i < client.config.permLevels.length; i++) {
  const thisLevel = client.config.permLevels[i];
  client.levelCache[thisLevel.name] = thisLevel.level;
}

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.aliases = new Discord.Collection();

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on("ready", message => {
  client.logger.ready(`${client.user.tag} Online !`);

  client.channels.cache.get("725006161362944021").send(`\u200B\n${client.user.username} Ready! | ${client.users.cache.size} users | ${client.guilds.cache.size} servers.`);

  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];

    client.user.setPresence({
      activity: { name: status, type: "WATCHING" },
      status: "dnd"
    });
  }, 5000);
});

client.on("message", async message => {
  
  if (!message.guild) return;

  let fetched = db.get(`prefix_${message.guild.id}`);
  if (fetched === null) prefix = "k.";
  else prefix = fetched;

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this server is \`${prefix}\``);
  }
  
  let blacklist = await db.fetch(`blacklist_${message.author.id}`);

  if (message.author.bot) return;

  if (message.guild && !message.member) await message.guild.fetchMember(message.author);

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const cmd = args.shift().toLowerCase();

  let ops = {
    ownerID: client.config.ownerID,
    dev: client.config.developer,
    prefix: prefix
  };

  let busy = await db.fetch(`busy_${ops.ownerID}`);

  if (
    busy === "Busy" &&
    message.content.includes(`^<@!?${ops.ownerID}>`) &&
    !message.content.includes(`${prefix}`)
  ) {
    return message.channel.send(
      { embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Sorry my creator is busy."}}
    );
  }

  if (!message.content.startsWith(prefix)) return;

  const level = client.permlevel(message);

  const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (!command) return;

  if (!client.cooldowns.has(command.name))
    client.cooldowns.set(command.name, new Discord.Collection());

  const member = message.member,
    now = Date.now(),
    timestamps = client.cooldowns.get(command.name),
    cooldownAmount = command.cooldown * 1000;

  if (!timestamps.has(member.id)) {
    if (!client.config.ownerID.includes(message.author.id)) {
      timestamps.set(member.id, now);
    }
  } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      const deleted = expirationTime - now;
      return message.channel
        .send(
          { embed: {color: "#00a5ff", description: `<:false:725413088014106676> | Please wait **${timeLeft.toFixed(
            1
          )}** seconds to try this command again.`}}
        )
        .then(message => message.delete({ timeout: `${deleted}` }));
    }

    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
  }

  if (level < client.levelCache[command.permLevel]) {
    return message.channel.send({embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You do not have permission to use this command."}})
  } else level > client.levelCache[command.permLevel];

  if (cmd.length === 0) return;

  if (blacklist === "Blacklisted")
    return message.channel.send(`<@${message.author.id}>`, { embed: {color: "#00a5ff", description: "<:false:725413088014106676> | You are blacklisted from the bot!"}})

  message.author.permLevel = level;
  
  if (command.nsfw && !message.channel.nsfw) return message.reply({embed:{color: "#00a5ff", title: "<:false:725413088014106676> | You're pervert, I need NSFW"}})

  if (command) command.run(client, message, args, ops, level);

  client.channels.cache.get("725006161362944021").send(
      `\u200B\n\`\`\`js\n[ ${message.author.username} ] ( ${message.author.id} )\n\`\`\`\`\`\`js\n[ ${message.channel.name} | ${message.guild.name} ]\n\`\`\`\`\`\`js\ncommand: ${command.name}\n\`\`\`\`\`\`js\n${message.content}\n\`\`\`\n`
    );
  client.logger.cmd(`${message.author.username} use command: ${command.name}`);
});

client.on("messageReactionAdd", async (reaction, user) => {
  
  const message = reaction.message;
  
  let ops = {
    ownerID: client.config.ownerID
  };
  
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  
  if (user.bot) return;
  if (user.id !== ops.ownerID) return;
  if (!reaction.message.guild) return;
  
  if (reaction.emoji.id === "726890996792688690") {
    await message.delete();
  }
  
})

client.on("guildMemberAdd", user => {
  
  if (user.guild.id !== "714515930016907344") return;
  
  const attachment = new Discord.MessageAttachment("https://media1.tenor.com/images/0ebd26fb887ec9ac1e12a0903b6b1afd/tenor.gif?itemid=13984218")

  let embed = new Discord.MessageEmbed()
    .setColor("#00a5ff")
    .setTitle("Welcome to server !!")
    .setThumbnail(user.user.avatarURL())
    .addField(
      `${user.guild.name} has waiting for you ${user.user.username}\n`,
      `I hope you feel at home here !\n\nThanks`
    )
    .setTimestamp()
    .setImage(attachment.attachment);

  client.channels.cache.get("723524051661881455").send(embed);
  
  user.roles.add("715768393721970688")
  
});

client.on("guildMemberRemove", member => {
  
  if (member.guild.id !== "714515930016907344") return;
  
  const attachment = new Discord.MessageAttachment("https://www.techjunkie.com/wp-content/uploads/2018/03/Anime-Gif-with-Sad-Face-2.gif")

  let embed = new Discord.MessageEmbed()
    .setColor("#00a5ff")
    .setTitle("Aww someone leave server")
    .setThumbnail(member.user.avatarURL())
    .addField(
      `${member.user.username} has left the server\n`,
      `I hope he/she returns >//<\n\nBye >w< !`
    )
    .setTimestamp()
    .setImage(attachment.attachment);

  client.channels.cache.get("723524051661881455").send(embed);
});

client.login(process.env.TOKEN);

// -------------------------------------------------- //

const http = require("http"),
      express = require("express"),
      app = express(),
      { Timers } = require("./variable")

app.get("/", (req, res) => {
  client.logger.debug("Ping Received");
  res.end("Kizuu#6271 is now Online");
});

app.get("/api/timers", async (req, res) => {
  let Arr = [];
  Timers.forEach((timer) => {
    Arr.push({
      GUILD: timer.Guild,
      Author: { ID: timer.Author.ID, TAG: timer.Author.Tag },
      TIME_IN_MS: timer.Time + " ms",
    });
  });
  res.send(Arr);
});

app.listen(process.env.PORT);