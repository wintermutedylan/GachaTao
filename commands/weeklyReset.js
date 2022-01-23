var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'resetweekly',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "resets the weekly raids won",
    async execute(client, message,cmd,args,Discord){
        let allPlayerData = await playerModel.find({});
        let sorted = allPlayerData.sort((a, b) => (b.weeklyRaidsWon) - (a.weeklyRaidsWon));
        let megaSorted = allPlayerData.sort((a, b) => (b.megaRaidDamageDone) - (a.megaRaidDamageDone));
        let megaTopTen = megaSorted.slice(0, 10);
        let firstPlace = sorted[0];
        let secondToFifth = sorted.slice(1, 5);
        let fifthToTwenty = sorted.slice(5, 20);
        let twentyToFifty = sorted.slice(20, 50);
        let theRest = sorted.slice(50);
        giveCoins(2000, firstPlace.userID);
        for (let s = 0; s < secondToFifth; s++){
            giveCoins(1500, secondToFifth[s].userID);
        }
        for (let a = 0; a < fifthToTwenty; a++){
            giveCoins(1000, fifthToTwenty[a].userID);
        }
        for (let v = 0; v < twentyToFifty; v++){
            giveCoins(750, twentyToFifty[v].userID);
        }
        for (let r = 0; r < theRest; r++){
            giveCoins(500, theRest[r].userID);
        }
        for (let m = 0; m < megaTopTen; m++){
            giveCoins(1000, megaTopTen[m].userID);
        }
        

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
                            megaRaidDamageDone: 0
                            
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