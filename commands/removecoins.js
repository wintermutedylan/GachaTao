var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'remove',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Remove coins from users",
    async execute(client, message, cmd, args, Discord){
        var ID = args.pop();
        var amount = args[0];
        
        

        if (amount < 1) return message.channel.send(`you can't remove ${amount} from the user.`);


        let playerData; 
            
        playerData = await playerModel.findOne({ userID: ID});
        if (!playerData) return message.channel.send(`That user doesn't exist`);
        if (playerData.coins - amount < 0) return message.channel.send(`you can't remove more Boo Taos than the user has. Try again`);

        try {
            await playerModel.findOneAndUpdate(
                {
                    userID: ID
                },
                {
                    $inc: {
                        coins: -amount
                    },
                }
            );

        } catch(err){
            console.log(err);
        }
        var user = await client.users.fetch(ID);
        message.reply(`You have removed ${amount} from ${user.username}#${user.discriminator}`)

    }
}