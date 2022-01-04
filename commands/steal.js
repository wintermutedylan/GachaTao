var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const lucky = require('lucky-item').default;
module.exports = {
    name: 'steal',
    aliases: [],
    permissions: [],
    description: "steal Boo Taos from a specific user",
    async execute(client, message,cmd,args,Discord){
        let authorData; 
        authorData = await playerModel.findOne({ userID: message.author.id});
        var currentTime = message.createdTimestamp;
        
        if (!authorData) return message.reply("Looks like there was an error finding your profile.  Try running g$register then try again");
        if (authorData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        var timePassed = authorData.stealCD;

        if ((timePassed + 300000) - currentTime < 300000){
            return message.reply("You must wait 5 minutes before you run this command again");
        }

        var person = message.mentions.members.first();
        if (!person) return message.channel.send("Please metion a user when using that command");
        if (person.id === message.author.id) return message.channel.send("You can't steal from yourself");

        let playerData; 
        playerData = await playerModel.findOne({ userID: person.id});

        if (!playerData) return message.reply("Looks like there was an error finding this players profile.");
        if (playerData.starterSelected === false) return message.reply("You can't steal from a player who hasn't selected a Starter yet.");
        if (playerData.coins < 4) return message.reply("This player doesn't have enough coins to steal from");
        var fourthCoins = (1 / 4) * playerData.coins;


        
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
                message.reply(`You have successfully stolen **${amount}** coins from **${person.displayName}**`)
                break;
            case 2:
                var amount = getRandomArbitrary(1, fourthCoins);
                if (authorData.coins - amount < 0) return message.reply(`The steal backfired but looks like you are too poor to lose any coins`);
                removeCoins(amount, message.author.id);
                message.reply(`The steal backfired and you have lost **${amount}** coins`);
                break;
            case 3:
                message.reply("The steal has failed. Try again later");
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