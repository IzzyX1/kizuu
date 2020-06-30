const config = {
  
  "ownerID": "709995623755022437",
  
  "admins": ["640409667360653334"],

  "support": ["533833592661344256"],
    
  "developer": "Kizuu Development",
  "default_prefix": "k.",
  "version": "1.0.0-a1",
  
  permLevels: [
    { level: 0,
      name: "User", 
      check: () => true
    },

    { level: 2,
      name: "Moderator",
      check: (message) => {
        try {
          return (message.member.hasPermission("KICK_MEMBERS" || "BAN_MEMBERS" || "MANAGE_ROLES" || "MANAGE_GUILD" || "MANAGE_MESSAGES" || "ADMINISTRATOR"))
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrator", 
      check: (message) => {
        try {
          return (message.member.hasPermission("ADMINISTRATOR"));
        } catch (e) {
          return false;
        }
      }
    },
    
    { level: 4,
      name: "Server Owner", 
      check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },
    
    { level: 8,
      name: "Bot Support",
      check: (message) => config.support.includes(message.author.id)
    },

    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },

    { level: 10,
      name: "Bot Owner", 
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;