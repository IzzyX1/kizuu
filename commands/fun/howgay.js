module.exports = {
  name: "howgay",
  category: "Fun",
  permLevel: "User",
  cooldown: "3",
  description: "Let's me rate how gay someone",
  usage: "howgay [user]",
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
    
    //if (message.author.id === ops.ownerID) return message.channel.send('You are 0% gay')
    if (message.author.id === '533833592661344256') return message.channel.send('You are 0% gay')
  
    return message.channel.send('You are ' + Math.floor(Math.random() * 100 + 0) + '% gay')
    
  }
  
  if (args[0]) {
    
    const user = getUserFromMention(args[0])
    
    //if (user.id === ops.ownerID) return message.channel.send(`${user.username} is 0% gay`)
    if (user.id === '533833592661344256') return message.channel.send(`${user.username} is 0% gay`)
    
    if (user) return message.channel.send(`${user.username} is ` + Math.floor(Math.random() * 100 + 0) + '% gay')
    
  }
  }
}