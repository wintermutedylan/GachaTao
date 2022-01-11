var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'claimdaily',
    aliases: [],
    permissions: [],
    description: "lets users claim their daily rolls",
    async execute(client, message,cmd,args,Discord){
        var ID = message.author.id;
        let playerData;
        playerData = await playerModel.findOne({ userID: ID});
        if (!playerData) return message.channel.send("This player doesn't exist. Please try again.");
        if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");

        if (!playerData.dailyReset) {
            try {
                await playerModel.findOneAndUpdate(
                    {
                        userID: ID
                    },
                    {
                        $inc: {
                            coins: 100,
                            raidTickets: 3
                        },
                    }
                );
                await playerModel.findOneAndUpdate(
                    {
                        userID: ID
                    },
                    {
                        $set: {
                            dailyReset: true
                            
                        },
                    }
                );
    
            } catch(err){
                console.log(err);
            }
            message.reply('You have claimed your daily 100<:bootaomonez:909294739197681754> and 3 Raid Tickets');
        }
        else {
            message.reply('Baka, You have already claimed your daily today.');
        }



    }
}