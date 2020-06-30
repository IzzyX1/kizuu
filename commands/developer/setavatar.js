module.exports = {
  name: 'setavatar',
  category: "Developer",
  cooldown: "60",
  permLevel: "Bot Owner",
  description: 'Change My avatar',
  usage: 'setavatar <usage>',
  run: async (client, message, args, ops) => {
    
  /*if (!/^(https?:\/\/)((([-a-z0-9]{1,})?(-?)+[-a-z0-9]{1,})(\.))+([a-z]{1,63})\/((([a-z0-9._\-~#%])+\/)+)?([a-z0-9._\-~#%]+)\.(jpg|jpeg|gif|png|bmp)$/i.test(args.join(' '))) {
    return message.channel.send('<:redtick:719865119277842492> | Please give me image link.')
  }*/

    try {
    await client.user.setAvatar(args.join(' '));
    } catch (e) {
      return message.channel.send({ embed: {color: "#00a5ff", description: `<:false:725413088014106676> | Error: ${e}`}})
    }
    
    return message.channel.send({
    embed: {
      color: ('#00a5ff'),
      description: `${client.user.username}'s avatar changed!`,
      timestamp: new Date()
    }
  })
    
  }
  
}