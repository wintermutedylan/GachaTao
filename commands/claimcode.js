var maids = require("../units/maids.json");
var quests = require("../units/quests.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const lucky = require('lucky-item').default;
module.exports = {
    name: 'claimcode',
    aliases: [],
    permissions: [],
    description: "Complete a quest",
    async execute(client, message,cmd,args,Discord){
        if (args.length > 1) {
            return message.reply('Please only one code');
        }if (args.length === 0){
            return message.reply('Please enter a Code');
        }
        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});
        if (!playerData) return message.channel.send("This player doesn't exist. Please try again.");
        if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");

        let questNumber = args[0];
        let code1 = "B978R389F42W9";
        let code2 = "QWFEGWRHBKLFNGTHB"; 

        if (playerData.questsComplete.includes(code1)) {
            
            try {
                return message.reply("You have already claimed this code")
            } catch(err){
                message.channel.send(`${userMention(message.author.id)} Something went wrong. Please try again`);
                client.channels.cache.get("838666046327619604").send(`${userStuff.username}#${userStuff.discriminator} sent a message in ${channelMention(message.channel.id)}`)
                client.channels.cache.get("838666046327619604").send(codeBlock('js', err));
            }
        }
        if (questNumber === code1){
            pushQuests(code1, message.author.id);
            giveCoins(500, message.author.id);
            giveTickets(1, message.author.id);
            message.channel.send(`${userMention(message.author.id)} You have claimed the code.  Enjoy your 500<:bootaomonez:909294739197681754> and Raid Ticket`)

        } else if(questNumber === code2){
            pushQuests(code2, message.author.id);
            giveCoins(500, message.author.id);
            giveTickets(5, message.author.id);
            message.channel.send(`${userMention(message.author.id)} You have claimed the code.  Enjoy your 500<:bootaomonez:909294739197681754> and 5 Raid Tickets`)
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