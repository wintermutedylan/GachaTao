var maids = require("../units/maids.json");
var quests = require("../units/quests.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const lucky = require('lucky-item').default;
module.exports = {
    name: 'claimitems',
    aliases: [],
    permissions: [],
    description: "my items",
    async execute(client, message,cmd,args,Discord){
        if (args.length === 0) return message.reply("Please enter a unit name");
        
        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});
        if (!playerData) return message.channel.send("You don't exist. Please try again.");
        if (playerData.starterSelected === false) return message.reply("you needs to run g$register first before anything else");
        let unit = args.join(" ");
        var rolledCP = 300000;
        var awkNeeded = 5;
        var awkThisUnit = false;

        if (unit != "Blakninja The Forbidden One"){
            return message.reply("That unit doesn't exist.  pleast try again");
        }
        let totalItems = playerData.items;

        if (totalItems.includes("Blakninja's Right Arm") && totalItems.includes("Blakninja's Left Arm") && totalItems.includes("Blakninja's Right Leg") && totalItems.includes("Blakninja's Left Leg") && totalItems.includes("Blakninja's Head")){
                message.reply("You have completed Blakninja The Forbidden One.  He has been added to your account. Congrats");
                var have = false;
                for (let location = 0; location < playerData.maids.length; location++){
                    if (playerData.maids[location].unit === unit){
                        
                        var owned = playerData.maids[location].dupes;
                        owned++;
                        if (owned === awkNeeded){
                            awkThisUnit = true;
                        }
                        
                        try {
                            await playerModel.findOneAndUpdate(
                                {
                                    userID: message.author.id
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
                                userID: message.author.id
                            },
                            {
                                $push: {
                                    maids: { unit: unit, dupes: 0 }
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
                        userID: message.author.id
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
        
            if (awkThisUnit){
                client.channels.cache.get("852360137528049684").send(`${userMention(message.author.id)} has just awoken ${unit} congrats!`);
            }
            const indexRightArm = totalItems.indexOf("Blakninja's Right Arm");
            if (indexRightArm > -1){
                totalItems.splice(indexRightArm, 1);
            }
            const indexLeftArm = totalItems.indexOf("Blakninja's Left Arm");
            if (indexLeftArm > -1){
                totalItems.splice(indexLeftArm, 1);
            }
            const indexRightLeg = totalItems.indexOf("Blakninja's Right Leg");
            if (indexRightLeg > -1){
                totalItems.splice(indexRightLeg, 1);
            }
            const indexLeftLeg = totalItems.indexOf("Blakninja's Left Leg");
            if (indexLeftLeg > -1){
                totalItems.splice(indexLeftLeg, 1);
            }
            const indexHead = totalItems.indexOf("Blakninja's Head");
            if (indexHead > -1){
                totalItems.splice(indexHead, 1);
            }
            pushItemArray(totalItems, message.author.id);

        } else {
            message.reply("You are missing a piece run g$myitems to learn which one it is.");
        }


    }
}

async function pushItemArray(n, ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $set: {
                    items: n
                    
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}