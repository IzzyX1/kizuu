const fetch = require("node-fetch");

module.exports = {
  name: "new-avatar",
  permLevel: "User",
  category: "Image",
  cooldown: "3",
  aliases: ["navatar"],
  description: "Get new Avatar",
  usage: "new-avatar",
  run: (client, message, args) => {
    const { MessageAttachment } = require("discord.js");
    const { body } = fetch("https://nekos.life/api/v2/img/avatar")
      .then(res => res.json())
      .then(result => {
        if (!result.url) return message.channel.send("Something wrong");
        const attachment = new MessageAttachment(result.url);

        message.channel.send({
          embed: {
            title: "Here <(￣︶￣)>",
            url: attachment.attachment,
            image: {
              url: attachment.attachment
            },
            timestamp: new Date(),
            color: "#00a5ff"
          }
        });
      });
  }
};
