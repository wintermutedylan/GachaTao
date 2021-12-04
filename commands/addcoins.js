var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'add',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Give coins to users",
    async execute(client, message, cmd, args, Discord){
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
                        coins: amount
                    },
                }
            );

        } catch(err){
            console.log(err);
        }
        var user = await client.users.fetch(ID);
        message.reply(`You have added ${amount} to ${user.username}#${user.discriminator}`)
    }
}