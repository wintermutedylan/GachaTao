var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'dailyraids',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "resets the daily so people can claim it again",
    async execute(client, message,cmd,args,Discord){
        
        let allPlayerData = await playerModel.find({});
        //return message.channel.send(`${allPlayerData.dailyRaidsPlayed}`)
        for (let i = 0; i < allPlayerData.length; i++){
            var ID = allPlayerData[i].userID;
            try {
                await playerModel.findOneAndUpdate(
                    {
                        userID: ID
                    },
                    {
                        $set: {
                            rollCD: 0
                            
                        },
                    }
                );
        
            } catch(err){
                console.log(err);
            }
        }
        message.channel.send(`${allPlayerData.length} players have daily resets at 0`);


    }
}