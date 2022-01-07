var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'resetweekly',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "resets the weekly so people can claim it again",
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
                            weeklyRaidsWon: 0,
                            
                        },
                    }
                );
        
            } catch(err){
                console.log(err);
            }
        }
        client.channels.cache.get("831222453089992774").send(`${roleMention("925850917679562793")} Weekly raids won has been reset, check your profile to see how much <:bootaomonez:909294739197681754> you got.`)
        message.channel.send(`${allPlayerData.length} players weekly raids won has been reset`);


    }
}