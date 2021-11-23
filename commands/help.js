const playerModel = require("../models/playerSchema");
var maids = require("../units/maids.json");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'help',
    aliases: ['h'],
    permissions: [],
    description: "Displays all the commands a user and use",
    async execute(client, message, cmd, args, Discord, profileData){
        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});
        if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        var ID = message.author.id;
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#BE0000')
        .setTitle('Avaliable Commands')
        .setDescription('All the commands that can be used')
        .addFields(
            { name: 'asdfasf', value: 'asdfasdf'},
            { name: 'asdfasdf', value: 'esdfsdfsdfsfda', inline: true },
            { name: 'asdfasdfsdfsf', value: 'sdfdffsf', inline: true}
        )
        .setFooter("Hope this helps");

        message.channel.send({ embeds: [newEmbed] });

        var target = message.guild.members.cache.get(ID);
        var role = "912807411843203072";
        if (target.roles.cache.some(role => role.name === 'Chapter 1')){
            
        } else {
            target.roles.add(role);
            giveCoins(2500, ID);
            message.channel.send(`${target} has been given 2500 <:bootaomonez:909294739197681754> and can now progress to Chapter 1`)

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

