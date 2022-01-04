var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'addtickets',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Give coins to users",
    async execute(client, message, cmd, args, Discord){
        if (args.length === 0) return message.reply("Please enter an amount then a user ID");
        var ID = args.pop();
        var amount = args[0];
        

        if (amount < 1) return message.channel.send(`you can't add ${amount} to the user.`);


        let playerData; 
            
        playerData = await playerModel.findOne({ userID: ID});
        if (!playerData) return message.channel.send(`That user doesn't exist`);

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
        var user = await client.users.fetch(ID);
        message.reply(`You have added ${amount} Raid Tickets to ${user.username}#${user.discriminator}`)
    }
}