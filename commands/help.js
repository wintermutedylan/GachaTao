const playerModel = require("../models/playerSchema");
var maids = require("../units/maids.json");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'help',
    aliases: ['h'],
    permissions: [],
    description: "Displays all the commands a user and use",
    async execute(client, message, cmd, args, Discord, profileData){
        if (args.length === 0){
            args.push('1');
        }
        var page = args[0];
        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});
        if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        var ID = message.author.id;
        if (page === '1'){
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#BE0000')
            .setTitle('Avaliable Commands')
            .setDescription('All the commands that can be used')
            .addFields(
                { name: 'g$create/g$register', value: 'Creates your profile and allows you to choose a starter. Usable once only (unless you somehow mess it up, baka).', inline: true},
                { name: 'g$profile', value: 'Brings up a detailed embed with your units, total cp, pity counter, and ~~adorable~~ disgusting pfp. ( you can also select a page: g$profile 2)', inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'g$roll', value: 'Does a single pull (costs 50 <:bootaomonez:909294739197681754> )', inline: true},
                { name: 'g$roll 10', value: 'Does 10 pulls (costs 500 <:bootaomonez:909294739197681754> )', inline: true},
                { name: '\u200B', value: '\u200B' },
                { name: 'g$help', value: 'brings up this list of commands + the pity rates', inline: true},
                { name: 'g$lb', value: 'pulls up a leaderboard where people are ranked by CP ( you can also select a page: g$lb 2)', inline: true},
                { name: '\u200B', value: '\u200B' },

            )
            .setFooter("Hope this helps");

            message.channel.send({ embeds: [newEmbed] });
        } else if (page === '2'){
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#BE0000')
            .setTitle('Avaliable Commands')
            .setDescription('All the commands that can be used')
            .addFields(
                { name: 'g$create/g$register', value: 'Creates your profile and allows you to choose a starter. Usable once only (unless you somehow mess it up, baka).', inline: true},
                { name: 'g$profile', value: 'Brings up a detailed embed with your units, total cp, pity counter, and ~~adorable~~ disgusting pfp. ( you can also select a page: g$profile 2)', inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'g$roll', value: 'Does a single pull (costs 50 <:bootaomonez:909294739197681754> )', inline: true},
                { name: 'g$roll 10', value: 'Does 10 pulls (costs 500 <:bootaomonez:909294739197681754> )', inline: true},
                { name: '\u200B', value: '\u200B' },
                { name: 'g$help', value: 'brings up this list of commands + the pity rates', inline: true},
                { name: 'g$lb', value: 'pulls up a leaderboard where people are ranked by CP ( you can also select a page: g$lb 2)', inline: true},
                { name: '\u200B', value: '\u200B' },

            )
            .setFooter("Hope this helps");

            message.channel.send({ embeds: [newEmbed] });
        } else {
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#BE0000')
            .setTitle('Avaliable Commands')
            .setDescription('All the commands that can be used')
            .addFields(
                { name: 'g$create/g$register', value: 'Creates your profile and allows you to choose a starter. Usable once only (unless you somehow mess it up, baka).', inline: true},
                { name: 'g$profile', value: 'Brings up a detailed embed with your units, total cp, pity counter, and ~~adorable~~ disgusting pfp. ( you can also select a page: g$profile 2)', inline: true },
                { name: '\u200B', value: '\u200B' },
                { name: 'g$roll', value: 'Does a single pull (costs 50 <:bootaomonez:909294739197681754> )', inline: true},
                { name: 'g$roll 10', value: 'Does 10 pulls (costs 500 <:bootaomonez:909294739197681754> )', inline: true},
                { name: '\u200B', value: '\u200B' },
                { name: 'g$help', value: 'brings up this list of commands + the pity rates', inline: true},
                { name: 'g$lb', value: 'pulls up a leaderboard where people are ranked by CP ( you can also select a page: g$lb 2)', inline: true},
                { name: '\u200B', value: '\u200B' },

            )
            .setFooter("Hope this helps");

            message.channel.send({ embeds: [newEmbed] });

        }

        

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

