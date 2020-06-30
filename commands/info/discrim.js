module.exports = {
  name: "discrim",
  category: "Info",
  permLevel: "User",
  cooldown: "3",
  aliases: ["discriminator"],
  description: "Looking for discriminator for you.",
  usage: "discrim <usage>",
  run: async (client, message, args) => {
  
  if (!/^\d{4}$/.test(args[0])) {
    return message.channel.send({ embed: {color: "#00a5ff", description: '<:false:725413088014106676> | Please input four numbers to look for a discriminator.'}})
  }
  
  if (args[0] === '0000') return message.channel.send({ embed: {color: "#00a5ff", description: '<:false:725413088014106676> | Discrim not found'}})

  let members = message.guild.members.cache.filter(m => m.user.discriminator === args[0]).map(m => m.user.tag);
  let total = members.length;
  members = members.length > 0 ? members.slice(0, 10).join('\n') : 'None';

  await message.channel.send({
    embed: {
      color: '#00a5ff',
      title: 'Discriminator search',
      description: `Found **${total}** users with discriminator **${args[0]}**`,
      fields: [
        {
          name: 'Users',
          value: total > 10 ? `${members} and ${total - 10} more.` : members
        }
      ]
    }
  })
  }
}