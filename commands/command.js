var maids = require("../units/maids.json");
var bosses = require("../units/raidbosses.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
const lucky = require('lucky-item').default;
module.exports = {
    name: 'testmilim',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "embeds",
    async execute(client, message,cmd,args,Discord){
        // let allPlayerData = await playerModel.find({});

        
        // const row = new MessageActionRow()
        // .addComponents(
        //     new MessageButton()
        //         .setCustomId('join')
        //         .setLabel('Join Raid')
        //         .setStyle('SUCCESS'),
        //     new MessageButton()
        //         .setCustomId('leave')
        //         .setLabel('Leave Raid')
        //         .setStyle('DANGER')
        // );
        let boss = lucky.itemBy(bosses, 'weight');
        var users = await client.users.fetch(message.author.id);
        let rewardSelection = lucky.itemBy(boss.rewards, 'weight');
        


        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')

        
        .setAuthor(`${users.username} has started a Raid`)
        
        .setDescription(`**${boss.id}**\nreward: ${rewardSelection.id}`)
        .setImage(`${boss.icon}`)
        .addFields(
            {name: 'Rule 1', value: 'Be nice'},
            {name: 'Rule 2', value: 'Praise Milim :heart: '},
            {name: 'Rule 3', value: 'bully melody <:hehehe:850914083967729676>'}

        )
        
        
        .setFooter('MILIM');
        if (boss.rareBoss){
            newEmbed.setTitle("hello <a:siren:937423605912969316>");
        }
        message.channel.send({ embeds: [newEmbed]})
        /*
        var users = await client.users.fetch(message.author.id);
        
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')
        .setTitle(`${users.username} has started a Raid`)
        .setDescription(`React with ✅ here to join the raid party!\n Dungeon closes in 60 seconds!\nParty Size: 0
        **Battle Mode Milim: Destroyer of Worlds**`)
        .setImage('https://media.discordapp.net/attachments/646489430777004045/930575556557299772/raidbossmilim.png')
        

        
        
        

        message.channel.send({ embeds: [newEmbed], components: [row]}).then(sent => {
            let entries = [];
            let totalPartyCP = 0;
            const collector = sent.createMessageComponentCollector({componentType: 'BUTTON', time: 15000});

            collector.on('collect', i => {
                if (userHasProfile(allPlayerData, i.user.id)){
                    let userCP = 0;
                    let userRaidsDone;
                    let A = Date.now();
                    for (let j = 0; j < allPlayerData.length; j++){
                        if (allPlayerData[j].userID === i.user.id){
                            userCP = allPlayerData[j].totalCP;
                            userRaidsDone = allPlayerData[j].dailyRaidsPlayed;
                            
                        }
                    }
                    
                    if (i.customId === 'join'){
                        if (entries.some( vendor => vendor['user'] === i.user.id )){
                            i.reply({ content: 'You have already joined this raid', ephemeral: true})
                        } else if(A - userRaidsDone < 300000 && i.user.id != message.author.id){
                            const ds = new Date(A - userRaidsDone);
                            let minutes = 4 - ds.getMinutes();
                            let seconds = 60 - ds.getSeconds();
                            i.reply({ content: `You must wait ${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)} minutes before you can raid again`, ephemeral: true});
                        } else {
                            entries.push({ user: i.user.id, CP: userCP});
                            totalPartyCP = totalPartyCP + userCP;
                            const newEmbedJoin = new Discord.MessageEmbed()
                            .setColor('#E76AA3')
                            .setTitle(`${users.username} has started a Raid`)
                            .setDescription(`React with ✅ here to join the raid party!\n Dungeon closes in 60 seconds!\nParty Size: ${entries.length}\nParty CP: ${new Intl.NumberFormat().format(totalPartyCP)}
                            **Battle Mode Milim: Destroyer of Worlds**`)
                            .setImage('https://media.discordapp.net/attachments/646489430777004045/930575556557299772/raidbossmilim.png')
                            i.update({ embeds: [newEmbedJoin], components: [row]});
                            i.followUp({ content: `You have joined the Raid with ${new Intl.NumberFormat().format(userCP)} CP`, ephemeral: true})
                            setDailyRaids(A, i.user.id);
                        }
                    } else if (i.customId === 'leave'){
                        if (!entries.some( vendor => vendor['user'] === i.user.id )){
                            i.reply({ content: "You can't leave a raid you haven't joined", ephemeral: true})
                        } else {
                            for (var k = entries.length - 1; k >= 0; --k) {
                                if (entries[k].user === i.user.id) {
                                    entries.splice(k,1);
                                }
                            }
                            
                            totalPartyCP = totalPartyCP - userCP;
                            
                            const newEmbedLeave = new Discord.MessageEmbed()
                            .setColor('#E76AA3')
                            .setTitle(`${users.username} has started a Raid`)
                            .setDescription(`React with ✅ here to join the raid party!\n Dungeon closes in 60 seconds!\nParty Size: ${entries.length}\nParty CP: ${new Intl.NumberFormat().format(totalPartyCP)}
                            **Battle Mode Milim: Destroyer of Worlds**`)
                            .setImage('https://media.discordapp.net/attachments/646489430777004045/930575556557299772/raidbossmilim.png')
                            i.update({ embeds: [newEmbedLeave], components: [row]});
                            i.followUp({ content: `You have left the Raid`, ephemeral: true})
                            setDailyRaids(1641854534523, i.user.id);
                        }
                    }
                

                } else {
                    i.reply({ content: `Looks like there was an error finding your profile .  Try running g$register then try again`, ephemeral: true})
                }
            })

            collector.on('end', collected => {
                
                let bossHP = 0;
                let highestCP = 0;
                let numberOfMembers = 0;
                let partyWon = false;
                let reward = 0;
                
                
                numberOfMembers = entries.length;
                for(let i = 0; i < entries.length; i++){
                    if (entries[i].CP > highestCP){
                        highestCP = entries[i].CP;
                    }
                }
                
                

                bossHP = getRandomArbitrary((highestCP / 2) * numberOfMembers, (highestCP * numberOfMembers) + 1);
                reward = Math.floor(100 * Math.log10(highestCP) * Math.sqrt(entries.length));
                partyWon = totalPartyCP >= bossHP;

                if (partyWon){
                    const newEmbed = new Discord.MessageEmbed()
                    .setColor('#E76AA3')
                    .setTitle(`Raid Won`)
                    .setDescription(`Congrats on winning the raid <a:HuTaoHype:878793570969063475>\nhere are some more details` )
                    .addFields(
                        {name: 'Started By', value: `${users.username}`},
                        {name: 'Boss HP', value: `${new Intl.NumberFormat().format(bossHP)}`},
                        {name: 'Party CP', value: `${new Intl.NumberFormat().format(totalPartyCP)}`},
                        {name: 'Reward Amount', value: `${new Intl.NumberFormat().format(reward)}<:bootaomonez:909294739197681754>`}
                    )
                    //message.channel.send(`Boss HP: ${new Intl.NumberFormat().format(bossHP)}\nParty CP: ${new Intl.NumberFormat().format(partyCP)}\nReward: ${new Intl.NumberFormat().format(reward)}\nWon? ${partyWon}`);
                    for (let j = 0; j < entries.length; j++){
                        giveCoins(reward, entries[j].user);
                        updateRaidCounter(entries[j].user);
                    }

                    message.channel.send({ embeds: [newEmbed] })
                    
                } else {
                    
                    let remainingHP = bossHP - totalPartyCP;
                    const newEmbed = new Discord.MessageEmbed()
                    .setColor('#E76AA3')
                    .setTitle(`Raid Lost`)
                    .setDescription(`Looks like you got beat up by Milim, Try again later <a:milimcry:928779807783780392>`)
                    .addFields(
                        {name: 'Started By', value: `${users.username}`},
                        {name: 'Boss HP', value: `${new Intl.NumberFormat().format(bossHP)}`},
                        {name: 'Party CP', value: `${new Intl.NumberFormat().format(totalPartyCP)}`},
                        {name: 'Remaining HP', value: `${new Intl.NumberFormat().format(remainingHP)}`}
                    )
                    .setImage('https://media.discordapp.net/attachments/646489430777004045/930575510050836500/milimtrim.gif')

                    message.channel.send({ embeds: [newEmbed] })


                }
            })

        })
        
        

        */
    }

    
}
async function userHasProfile(data, ID){
    if (!data.some( vendor => vendor['userID'] === ID )){
        return false;
    } 
    let starter = false;
    for (let i = 0; i < data.length; i++){
        if (data[i].userID === ID){
            starter = data[i].starterSelected;
        } 
    }
    return starter;

}
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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
async function updateRaidCounter(ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $inc: {
                    raidsWon: 1,
                    weeklyRaidsWon: 1
                    
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}

async function removeTickets(ammount, ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $inc: {
                    raidTickets: -ammount
                    
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}
async function setRaidCD(time, ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $set: {
                    raidCD: time,
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}
async function setDailyRaids(timeer, ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $set: {
                    dailyRaidsPlayed: timeer,
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}