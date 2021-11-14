const playerModel = require("../models/playerSchema");
var unitSplash = require("../units/maids.json");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'addunit',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "embeds",
    async execute(client, message,cmd,args,Discord){
        var channelID = args.pop();
        var ID = args.pop();
        var unitName = args.join(" ");
        try {
            await playerModel.findOneAndUpdate(
                {
                    userID: ID
                },
                {
                    $push: {
                        maids: { unit: unitName, dupes: 0 }
                    },
                }
            );
            await playerModel.findOneAndUpdate(
                {
                    userID: ID
                },
                {
                    $set: {
                        starterSelected: true,
                        coins: 500
                    },
                }
            );

        } catch(err){
            console.log(err);
        }

        client.channels.cache.get(channelID).send(`${unitName} has been added to your account ${userMention(ID)}`)
        
        

        
    }

    
}