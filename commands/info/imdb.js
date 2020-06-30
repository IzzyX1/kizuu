const discord = require("discord.js");
const imdb = require("imdb-api");

module.exports = {
  name: "imdb",
  description: "Get the information about series and movie",
  category: "Info",
  cooldown: "3",
  permLevel: "User",
  usage: "imdb <usage>",
  run: async (client, message, args, color) => {
    if (!args.length) {
      return message.channel.send(
        { embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please input Movie or Series name"}}
      );
    }

    const imob = new imdb.Client({ apiKey: "10d08a89" }); // 10d08a89 // 5e36f0db

    let movie = await imob.get({ name: args.join(" ") });

    let embed = new discord.MessageEmbed()
      .setTitle(movie.title)
      .setColor("#00a5ff")
      .setThumbnail(movie.poster)
      .setDescription(movie.plot)
      .setFooter(`Ratings: ${movie.rating}`)
      .addField("Country", movie.country, true)
      .addField("Languages", movie.languages, true)
      .addField("Type", movie.type, true);

    message.channel.send(embed);
  }
};
