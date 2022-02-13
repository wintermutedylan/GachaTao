var maids = require("../units/maids.json");
var prestigeStuff = require("../units/prestigeinfo.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const { Message } = require("discord.js");
module.exports = {
    name: 'reseteveryone',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "resets everyone",
    async execute(client, message,cmd,args,Discord){
        //return message.reply("no");
        let allPlayerData = await playerModel.find({});
        for (let i = 0; i < allPlayerData.length; i++){
            for (let j = 0; j < allPlayerData[i].maids.length; j++){
                if (allPlayerData[i].maids[j].unit === "Milim"){
                    addMilim("<:milimbadge:942461664031297557>", allPlayerData[i].userID);

                } 
                else if (allPlayerData[i].maids[j].unit === "Maid Milim"){
                    addMilim("<:maidmilimbadge:942459609497624596>", allPlayerData[i].userID);
                }
                else if (allPlayerData[i].maids[j].unit === "Summer Milim"){
                    addMilim("<:summermilimbadge:942500690113208360>", allPlayerData[i].userID);
                }
                else if (allPlayerData[i].maids[j].unit === "Galaxy Milim"){
                    addMilim("<:galaxymilimbadge:942505910641754182>", allPlayerData[i].userID);
                }
                else if (allPlayerData[i].maids[j].unit === "CNY Milim"){
                    addMilim("<:cnymilimbadge:942453930082861149>", allPlayerData[i].userID);
                }
                else if (allPlayerData[i].maids[j].unit === "Milim Aki"){
                    addMilim("<:akimilimbadge:942504140830015558>", allPlayerData[i].userID);
                }
                else if (allPlayerData[i].maids[j].unit === "Bugcat Milim"){
                    addMilim("<:bugcatmilimbadge:942507932803797022>", allPlayerData[i].userID);
                }
            }
            wipePlayer(allPlayerData[i].maids.slice(0, 1), allPlayerData[i].userID)
        }
        message.channel.send(`Reset ${allPlayerData.length} players`);
    }
}

async function wipePlayer(unitArray, i) {
    if (unitArray.length === 0){

    }
    unitArray[0].dupes = 0
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: i
            },
            {
                $set: {
                    userID: i,
                    maids: unitArray,
                    dailyReset: false,
                    starterSelected: true,
                    totalCP: 10000,
                    stealCD: 1640744901699,
                    raidCD: 1640744901699,
                    raidsWon: 0,
                    weeklyRaidsWon: 0,
                    questsComplete: [],
                    dailyRaidsPlayed: 0,
                    rollCD: 1640744901699,
                    megaRaidDamageDone: 0,
                    items: [],
                    prestigeLevel: 0,
                    maxCP: 20000000,
                    raidBoost: 0,
                    dailyRaidCap: 20
                    


                },
            }
        );

    } catch(err){
        console.log(err);
    }
}

async function addMilim(milimEmote, ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $push: {
                    milimsOwned: milimEmote,
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}