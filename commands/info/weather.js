const weather = require('weather-js');
const discord = require('discord.js')

module.exports = {
  name: "weather",
  description: "Get the weather of anywhere",
  category: "Info",
  permLevel: "User",
  cooldown: "3",
  usage: "weather <degreeType> <state>",
  run: (client, message, args) => {
    
    let temp = args[0];
    if(!temp) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please include degree type"}})
    
    if(!args[1]) {
      return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Please input weather location"}})
    }
    
    let type;
    if (temp === "c" || temp === "C") type = "Celcius"
    if (temp === "f" || temp === "F") type = "Fahrenheit"
    
 weather.find({search: args.slice(1).join(" "), degreeType: `${temp}`}, function(err, result) {
   
   if (type === undefined) return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Supported degrees is `F` and `C`."}})
   
try {
 
let embed = new discord.MessageEmbed()
.setTitle(`Weather - ${result[0].location.name}`)
.setColor("#00a5ff")
.setDescription("Temperature units can may be differ some time")
.addField("Temperature", `${result[0].current.temperature}° ${type}`, true)
.addField("Sky Text", result[0].current.skytext, true)
.addField("Humidity", result[0].current.humidity, true)
.addField("Wind Speed", result[0].current.windspeed, true)
.addField("Observation Time", result[0].current.observationtime, true)
.addField("Wind Display", result[0].current.winddisplay, true)
.setThumbnail(result[0].current.imageUrl);
   message.channel.send(embed)
} catch(err) {
  return message.channel.send({ embed: {color: "#00a5ff", description: "<:false:725413088014106676> | Unable to get data from given location"}})
}
});   
    
  }
}
