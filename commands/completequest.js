var maids = require("../units/maids.json");
var quests = require("../units/quests.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const lucky = require('lucky-item').default;
module.exports = {
    name: 'completequest',
    aliases: ['claimquest'],
    permissions: [],
    description: "Complete a quest",
    async execute(client, message,cmd,args,Discord){
        if (args.length > 1) {
            return message.reply('Please only enter one number');
        }if (args.length === 0){
            return message.reply('Please enter a quest number');
        }
        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});
        if (!playerData) return message.channel.send("This player doesn't exist. Please try again.");
        if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");

        let questNumber = args[0];
        
        if (questNumber === "Milim"){
            if (playerData.questsComplete.includes("Milim")) return message.reply("You have already completed this quest!");
            let milimsOwned = [];
            for (let m = 0; m < playerData.maids.length; m++){
                if (playerData.maids[m].unit === "Milim" || playerData.maids[m].unit === "Summer Milim" || playerData.maids[m].unit === "Maid Milim" || playerData.maids[m].unit === "Galaxy Milim"){
                    milimsOwned.push(playerData.maids[m].unit);
                }
            }
            if (milimsOwned.includes("Milim") && milimsOwned.includes("Summer Milim") && milimsOwned.includes("Maid Milim") && milimsOwned.includes("Galaxy Milim")){
                pushQuests("Milim", message.author.id);
                giveCoins(10000, message.author.id);
                return message.reply(`CONGRATS, You have Collected all the avaliable Milims.  You either have crazy luck or bribed someone. For completing this quest you have been awarded 10000<:bootaomonez:909294739197681754>`)
            } else {
                return message.reply("You don't meet the requirements for this Quest. Please try again later");
            }

        }
        else if (questNumber === "160"){
            let secretAuthor = message.author.id;
            message.delete();
            if (playerData.questsComplete.includes("160")) {
                
                return message.channel.send(`${userMention(secretAuthor)} You have already completed this quest!`);
                
            } else {
            
            
                pushQuests("160", secretAuthor);
                giveCoins(1000, secretAuthor);
                giveTickets(4, secretAuthor);
                return message.channel.send(`Congrats ${userMention(secretAuthor)} you have found the sugar cookies and claimed 1000<:bootaomonez:909294739197681754> and 4 raid tickets!`);
            }

        }
        else if (questNumber === "37894"){
            let secretAuthor1 = message.author.id;
            message.delete();
            if (playerData.questsComplete.includes("37894")) {
                
                return message.channel.send(`${userMention(secretAuthor1)} You have already completed this quest!`);
                
            } else {
            
                pushQuests("37894", secretAuthor1);
                giveCoins(2500, secretAuthor1);
                return message.channel.send(`Congrats, ${userMention(secretAuthor1)} you've solved Chapter 1's secret quest and earned 2,500<:bootaomonez:909294739197681754>`);
            }

        } 
        
        //check for milim and the ice cream quest here
        let selectedQuest
        for (let i = 0; i < quests.length; i++){
            if (quests[i].number === questNumber){
                selectedQuest = quests[i];
            }
        }
        if (!selectedQuest) return message.reply("Please enter a value quest number");
        if (playerData.questsComplete.includes(selectedQuest.number)) return message.reply("You have already completed this quest!");

        let questDone = false;
        
        switch(selectedQuest.type){
            case "CP":
                if (playerData.totalCP >= selectedQuest.requirement){
                    questDone = true;
                }
                
                break;
            case "Awaken Starter":
                let starterDupes = "";
                for (let j = 0; j < playerData.maids.length; j++){
                    if (playerData.maids[j].unit === playerData.starterName){
                        starterDupes = playerData.maids[j].dupes;
                    }
                }
                if (starterDupes === 5){
                    questDone = true;
                }
                break;
            case "Total Raids Won":
                if (playerData.raidsWon >= selectedQuest.requirement){
                    questDone = true;
                }
                break;
            default:
                questDone = false;  
        }
        

        if (questDone){
            switch(selectedQuest.rewardtype){
                case "bootao":
                    let rewardAmount = parseInt(selectedQuest.reward);
                    pushQuests(selectedQuest.number, message.author.id);
                    giveCoins(rewardAmount, message.author.id);
                    if (selectedQuest.type === "Total Raids Won"){
                        message.reply(selectedQuest.rewardMessage);
                    } else {
                        message.reply(`You have completed the quest ${selectedQuest.name} and have been awarded ${rewardAmount}<:bootaomonez:909294739197681754>`);
                    }
                    break;
                case "unit":
                    let awkThisUnit = false;
                    for (let location = 0; location < playerData.maids.length; location++){
                        if (playerData.maids[location].unit === playerData.starterName){
                            
                            var owned = playerData.maids[location].dupes;
                            owned++;
                            if (owned === 5){
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
                                await playerModel.findOneAndUpdate(
                                    {
                                        userID: message.author.id
                                    },
                                    {
                                        $inc: {
                                            totalCP: 10000,
                                        },
                                    }
                                );
            
                            } catch(err){
                                console.log(err);
                            }
                            break;
                        }
                    }
                    if (awkThisUnit){
                        message.channel.send(`${userMention(message.author.id)} has just awoken ${playerData.starterName}, Congrats!`);
                    }
                    pushQuests(selectedQuest.number, message.author.id);
                    message.reply(`You have completed the quest **${selectedQuest.name}** and have been awarded 1 Starter dupe`);
                    break;
                case "tickets":
                    let rewardNumber = parseInt(selectedQuest.reward);
                    pushQuests(selectedQuest.number, message.author.id);
                    giveTickets(rewardNumber, message.author.id);
                    message.reply(`You have completed the quest **${selectedQuest.name}** and have been awarded ${rewardNumber} Raid Tickets`);
                    break;
                    
            }

        } else {
            return message.reply("You don't meet the requirements for this Quest. Please try again later");

        }
        



        
    }
}

async function giveCoins(ammount, ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $inc: {
                    coins: ammount
                    
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}

async function giveTickets(amount, ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $inc: {
                    raidTickets: amount
                },
            }
        );
    
    } catch(err){
        console.log(err);
    }
}

async function pushQuests(n, ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $push: {
                    questsComplete: n
                    
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}
