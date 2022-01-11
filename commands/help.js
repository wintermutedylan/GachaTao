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
            .setTitle('Available Commands')
            .setDescription(`__**Info**__
            Concept: HTC Gacha Game
            Participants play a rudimentary version of a HTC gacha game where participating in quests, mini games, and other events give them currency to roll for characters. 
            
            Bot Name: Gacha Tao
            Bot prefix: g$
            Currency: 50 <:bootaomonez:909294739197681754> = 1 pull 
            
            __Commands__
            **g$profile** <page number> - Brings up a detailed embed with your units, total cp, pity counter, and ~~adorable~~ disgusting pfp.
            **g$roll** -  Does a single pull (costs 50 <:bootaomonez:909294739197681754> )
            **g$roll 10** - Does 10 pulls (costs 500 <:bootaomonez:909294739197681754> )
            **g$help** - brings up this list of commands + the pity rates
            **g$lb** - pulls up a leaderboard where people are ranked by CP
            **g$claimquest** <quest number/code> - claims the quest specified
            **g$myquests** - brings up a list of completed quests
            **g$unit** <unit name> - brings up a brief description of the unit
            **g$claimdaily** - Claims your daily <:bootaomonez:909294739197681754> and Raid Tickets
            **g$raidhelp** - brings up the simple raid guide`)
            .setFooter("LR Pity: 175, UR Pity: 50");

            message.channel.send({ embeds: [newEmbed] });
        

        
        if (message.guild.id === "830700055451271188"){

        
        var target = message.guild.members.cache.get(ID);
        var role = "925850917679562793";
        if (target.roles.cache.some(role => role.name === '45k Participant')){
            
        } else {
            target.roles.add(role);
            giveCoins(2500, ID);
            message.channel.send(`${target} has been given 2500 <:bootaomonez:909294739197681754> and can now progress to Chapter 1`)

        }
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

