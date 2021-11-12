var maids = require("../units/maids.json");
module.exports = {
    name: 'testjson',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "embeds",
    async execute(client, message,cmd,args,Discord){
        message.channel.send(maids[1].id);
        

        
    }

    
}