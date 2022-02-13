const playerModel = require("../models/playerSchema");
var maids = require("../units/maids.json");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'prestigehelp',
    aliases: [],
    permissions: [],
    description: "Explains all the commands a user can use related to the prestige system",
    async execute(client, message, cmd, args, Discord, profileData){
        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});
        if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
    
        var ID = message.author.id;
        
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#BE0000')
            .setTitle('Prestige Commands')
            .setDescription(`**__Prestige Commands__**
            **g$prestigehelp - brings up a list of prestige commands 
            **g$prestige - resets the your CP to 0, clears your maid inventory, raises your CP cap by 20 million, adds a bonus relative to your new prestige level (this bonus should be applied to raid rewards), occasionally raises the max raids per day you can do. 
            
            __Prestige Levels__
            > Tutorial : 20 million CP, 20 daily raids
            > Prestige 1 : 40 million CP, 3% raid reward bonus
            > Prestige 2 : 60 million CP, 5% raid reward bonus, increased to 30 daily raids 
            > Prestige 3 : 80 million CP, 7% raid reward bonus
            > Prestige 4 : 100 million CP, 10% raid reward bonus, increased to 40 daily raids 

            `)
            .setFooter("owo");

            message.channel.send({ embeds: [newEmbed] });
            var users = await client.users.fetch(message.author.id);
            if (playerData.prestigeHelpStatus === true) {

            } else {
                giveCoins(1000, ID);
                message.channel.send(`${users.username} has been given 1000 <:bootaomonez:909294739197681754> for running the g$prestigehelp command for the first time`)
                await playerModel.findOneAndUpdate(
                    {
                        userID: ID
                    },
                    {
                    $set: {
                        prestigeHelpStatus: true,
                    }
                })
            }
    } 
}

async function giveCoins(amount, ID){
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
}
    



