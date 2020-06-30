module.exports = {
  name: "howlesbi",
  category: "Fun",
  permLevel: "User",
  cooldown: "3",
  description: "Let's me rate how lesbi someone",
  usage: "howlesbi [user]",
  run: (client, message, args, ops) => {
  
  function getUserFromMention(mention) {
    
	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
    
  }
        
}
  if (!args[0]) {
    
    if (message.author.id === ops.ownerID) return message.channel.send('You are 0% lesbi')
    if (message.author.id === '533833592661344256') return message.channel.send('You are 0% lesbi')
  
    return message.channel.send('You are ' + Math.floor(Math.random() * 100 + 0) + '% lesbi')
    
  }
  
  if (args[0]) {
    
    const user = getUserFromMention(args[0])
    
    if (user.id === ops.ownerID) return message.channel.send(`${user.username} is 0% lesbi`)
    if (user.id === '533833592661344256') return message.channel.send(`${user.username} is 0% lesbi`)
    
    if (user) return message.channel.send(`${user.username} is ` + Math.floor(Math.random() * 100 + 0) + '% lesbi')
    
  }
  }
}