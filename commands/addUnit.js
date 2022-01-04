var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'addunit',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "adds the specified unit to the user",
    async execute(client, message,cmd,args,Discord){
        if (args.length === 0) return message.reply("Please enter a unit name then a user ID");
            var ID = args.pop();
            
            var unitName = args.join(" ");
            var isUnit = false;
            var rolledCP;
            var awkNeeded;
            var awkThisUnit = false;
            for (let i = 0; i < maids.length; i++){
                if (unitName === maids[i].id){
                    isUnit = true;
                    rolledCP = maids[i].CP;
                    awkNeeded = maids[i].awakenThreshold;

                    
                }
            }
            if (!isUnit) return message.reply(`**${unitName}** is not a valid unit, Please enter a valid unit`);

            let playerData; 
            
            playerData = await playerModel.findOne({ userID: ID});
            
                
            
                var have = false;
                for (let location = 0; location < playerData.maids.length; location++){
                    if (playerData.maids[location].unit === unitName){
                        
                        var owned = playerData.maids[location].dupes;
                        owned++;
                        if (owned === awkNeeded){
                            awkThisUnit = true;
                        }
                        
                        try {
                            await playerModel.findOneAndUpdate(
                                {
                                    userID: ID
                                },
                                {
                                    $set: {
                                        ["maids." + location + ".dupes"]: owned
                                    },
                                }
                            );
        
                        } catch(err){
                            console.log(err);
                        }
                        have = true;
                        break;
                    }
                }
                if (!have){
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
    
                    } catch(err){
                        console.log(err);
                    }

                }
            
            try {
                await playerModel.findOneAndUpdate(
                    {
                        userID: ID
                    },
                    {
                        $inc: {
                            totalCP: rolledCP,
                        },
                    }
                );

            } catch(err){
                console.log(err);
            }
        
            var user = await client.users.fetch(ID);
            message.reply(`**${unitName}** has been added to ${user.username}#${user.discriminator}`);
            if (awkThisUnit){
                client.channels.cache.get("852360137528049684").send(`${userMention(message.author.id)} has just awoken ${unitName} congrats!`);
            }

    }
}