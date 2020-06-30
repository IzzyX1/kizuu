const fetch = require("node-fetch");

module.exports = {
  name: "hug",
  category: "Image",
  cooldown: "3",
  permLevel: "User",
  description: "Get Hugging gif",
  usage: "hug [user]",
  run: (client, message, args) => {
    function getUserFromMention(mention) {
      if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);

        if (mention.startsWith("!")) {
          mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
      }
    }

    const { MessageAttachment } = require("discord.js");
    const { body } = fetch("https://nekos.life/api/v2/img/hug")
      .then(res => res.json())
      .then(result => {
        if (!result.url) return message.channel.send("Something wrong");
        const attachment = new MessageAttachment(result.url);
        
        if (!args[0]) {
          message.channel.send({
            embed: {
              title: `A hug from ${message.author.username}`,
              image: {
                url: attachment.attachment
              },
              timestamp: new Date(),
              color: "#00a5ff"
            }
          });
        }

        if (args[0]) {
          const user = getUserFromMention(args[0]);

          message.channel.send({
            embed: {
              title: `${message.author.username} hug ${user.username}`,
              image: {
                url: attachment.attachment
              },
              timestamp: new Date(),
              color: "#00a5ff"
            }
          });
        }
      });
  }
};
