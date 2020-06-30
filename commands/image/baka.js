const fetch = require("node-fetch");

module.exports = {
  name: "baka",
  category: "Image",
  permLevel: "User",
  cooldown: "3",
  description: "Get Baka gif",
  usage: "baka [user]",
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
    const { body } = fetch("https://nekos.life/api/v2/img/baka")
      .then(res => res.json())
      .then(result => {
        if (!result.url) return message.channel.send("Something wrong");
        const attachment = new MessageAttachment(result.url);
        
        if (!args[0]) {
          message.channel.send({
            embed: {
              title: "Anata Baka",
              image: {
                url: attachment.attachment
              },
              timestamp: new Date(),
              color: "#00a5ff"
            }
          });
        }

        if (args[0]) {
          const user = getUserFromMention(args[0])

          message.channel.send({
            embed: {
              title: `Anata Baka, ${user.username}`,
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
