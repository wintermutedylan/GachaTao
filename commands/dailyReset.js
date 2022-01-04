var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'resetdaily',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "resets the daily so people can claim it again",
    async execute(client, message,cmd,args,Discord){
        let allPlayerData = await playerModel.find({});

        for (let i = 0; i < allPlayerData.length; i++){
            var ID = allPlayerData[i].userID;
            try {
                await playerModel.findOneAndUpdate(
                    {
                        userID: ID
                    },
                    {
                        $set: {
                            dailyReset: false,
                            
                        },
                    }
                );
        
            } catch(err){
                console.log(err);
            }
        }
        message.channel.send(`${allPlayerData.length} players can now claim their daily rolls`);


    }
}