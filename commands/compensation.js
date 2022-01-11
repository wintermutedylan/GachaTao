var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'compensation',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "resets the daily so people can claim it again",
    async execute(client, message,cmd,args,Discord){
        if (args.length === 0) return message.reply("Please enter an amount");
        let amount = args[0];

        let allPlayerData = await playerModel.find({});

        for (let i = 0; i < allPlayerData.length; i++){
            var ID = allPlayerData[i].userID;
            try {
                await playerModel.findOneAndUpdate(
                    {
                        userID: ID
                    },
                    {
                        $inc: {
                            coins: amount,
                            raidTickets: 3
                            
                        },
                    }
                );
        
            } catch(err){
                console.log(err);
            }
        }
        message.channel.send(`${allPlayerData.length} players have been given ${amount}<:bootaomonez:909294739197681754>`);


    }
}