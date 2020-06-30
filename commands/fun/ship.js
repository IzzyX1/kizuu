const Discord = require('discord.js')
const { NekoBot } = require("nekobot-api")
const api = new NekoBot()

module.exports = {
  name: 'ship',
  category: 'Fun',
  cooldown: "3",
  permLevel: "User",
  description: 'Ship any user',
  usage: 'ship [user] [user2]',
  run: async (client, message, args) => {
    
function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}
    
  let users = message.mentions.users.map(u => u.username);
  if (users.length < 2) {
    return message.channel.send({ embed: {color: "#00a5ff", description: '<:false:725413088014106676> | Please mention 2 people to ship.'}})
  }
    
  if (users.length > 2) {
    return message.channel.send({ embed: {color: "#00a5ff", description: '<:false:725413088014106676> | What the f*ck? triangle love?'}})
  }
    
    message.channel.startTyping(3)
  
  let shippedName = '';
  for (let i = 0; i < users.length; i++) {
    shippedName += `${users[i].substring(0, users[i].length / 2)}`;
  }
    
    const user1 = getUserFromMention(args[0])
    const user2 = getUserFromMention(args[1])
    
    let image = await api.imageGen.ship(user1.displayAvatarURL(), user2.displayAvatarURL())
  
    const attachment = new Discord.MessageAttachment(image)
    
    message.channel.stopTyping(true)
    
  await message.channel.send({
    embed: {
      color: '#00a5ff',
      image: {
        url: attachment.attachment
      },
      description: `${users.join(" + ")} = **${shippedName}**`,
    }
  });
  
}
}