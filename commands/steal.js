var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const lucky = require('lucky-item').default;
module.exports = {
    name: 'steal',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "steal Boo Taos from a specific user",
    async execute(client, message,cmd,args,Discord){
        return message.channel.send("Under Construction.  Will make an annoucment when done");

        let authorData; 
        authorData = await playerModel.findOne({ userID: message.author.id});
        var currentTime = message.createdTimestamp;
        
        if (!authorData) return message.reply("Looks like there was an error finding your profile.  Try running g$register then try again");
        if (authorData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        var timePassed = authorData.stealCD;

        
        

        var person = message.mentions.members.first();
        if (!person) return message.channel.send("Please metion a user when using that command");
        if (person.id === message.author.id) return message.channel.send("You can't steal from yourself");
        if (person.user.bot) return message.channel.send("You can't steal from a bot");
        
        if (currentTime - timePassed < 28800000){
            const d = new Date(currentTime - timePassed);
            let hours = 26 - d.getHours();
            let minutes = 60 - d.getMinutes();
            let seconds = 60 - d.getSeconds();
            return message.reply(`You must wait ${hours.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)} hours before you can steal again`);
        }
        
        

        let playerData; 
        playerData = await playerModel.findOne({ userID: person.id});

        if (!playerData) return message.reply("Looks like there was an error finding this players profile.");
        if (playerData.starterSelected === false) return message.reply("You can't steal from a player who hasn't selected a Starter yet.");
        if (playerData.coins < 4) return message.reply("This player doesn't have enough coins to steal from");
        var fourthCoins = (1 / 4) * playerData.coins;
        var authorCoins = (1 / 4) * authorData.coins;


        
        try {
            await playerModel.findOneAndUpdate(
                {
                    userID: message.author.id
                },
                {
                    $set: {
                        stealCD: message.createdTimestamp,
                    },
                }
            );

        } catch(err){
            console.log(err);
        }
        const arr = [
            { id: 1, weight: 25 },
            { id: 2, weight: 25 },
            { id: 3, weight: 50 },
        ];
        var rolled = lucky.itemBy(arr, 'weight');

        switch (rolled.id){
            case 1:
                var amount = getRandomArbitrary(1, fourthCoins);
                giveCoins(amount, message.author.id);
                removeCoins(amount, person.id);
                setStealCD(currentTime, message.author.id);
                message.reply(`You have successfully stolen **${amount}** <:bootaomonez:909294739197681754> from **${person.displayName}**`)
                break;
            case 2:
                var amount = getRandomArbitrary(1, authorCoins);
                if (authorData.coins - amount < 0) return message.reply(`The steal backfired but looks like you are too poor to lose any <:bootaomonez:909294739197681754>`);
                removeCoins(amount, message.author.id);
                setStealCD(currentTime, message.author.id);
                message.reply(`The steal backfired and you have lost **${amount}** <:bootaomonez:909294739197681754>`);
                break;
            case 3:
                message.reply("The steal has failed. Try again later");
                setStealCD(currentTime, message.author.id);
                break;
        }
        

    }
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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
async function removeCoins(ammount, ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $inc: {
                    coins: -ammount
                    
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}
async function setStealCD(time, ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $set: {
                    stealCD: time,
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}