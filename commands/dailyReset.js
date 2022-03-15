var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'resetdaily',
    aliases: [],
    permissions: [],
    description: "resets the daily so people can claim it again",
    async execute(client, message,cmd,args,Discord){
        var target = message.guild.members.cache.get(message.author.id);
        var eventRole = "830700055525589001";
        var adminRole = "831570884857823303";
        var guideRole = "831221217364017202";

        if (target.roles.cache.some(role => role.id === eventRole || role.id === guideRole || role.id === adminRole)){
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
                                dailyRaidsPlayed: 0
                                
                            },
                        }
                    );
            
                } catch(err){
                    console.log(err);
                }
            }
            message.channel.send(`${allPlayerData.length} players can now claim their daily rolls`);
        }  else {
            message.channel.send("You don't have the required permissions to use this command");
            

        }


    }
}