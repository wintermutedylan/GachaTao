var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
var bosses = require("../units/raidbosses.json");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const lucky = require('lucky-item').default;
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'startraid',
    aliases: [],
    permissions: [],
    description: "battle a raid boss",
    async execute(client, message,cmd,args,Discord){
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('join')
                .setLabel('Join Raid')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('leave')
                .setLabel('Leave Raid')
                .setStyle('DANGER')
        );
        
        let allPlayerData = await playerModel.find({});
        let authorData; 
        authorData = await playerModel.findOne({ userID: message.author.id});
        let currentTime = message.createdTimestamp;
        
        let partyCP = 0;
        
        if (!authorData) return message.reply("Looks like there was an error finding your profile.  Try running g$register then try again");
        if (authorData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        if (authorData.raidTickets === 0) return message.reply("You have no more Raid Tickets to use");
        let timePassed = authorData.raidCD;
        
        if (message.author.id === "618884909494304808" || message.author.id === "238364422135873536"){

        }
        else if (currentTime - timePassed < 300000){
            const d = new Date(currentTime - timePassed);
            let minutes = 4 - d.getMinutes();
            let seconds = 60 - d.getSeconds();
            return message.reply(`You must wait ${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)} minutes before you can raid again`);
        }
        //return message.channel.send(`${(timePassed + 300000) - currentTime}`);
        removeTickets(1, message.author.id);
        
        setRaidCD(currentTime, message.author.id);
        let boss = lucky.itemBy(bosses, 'weight');
        var users = await client.users.fetch(message.author.id);
        let rewardSelection = lucky.itemBy(boss.rewards, 'weight');
        
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')
        .setAuthor(`${users.username} has started a Raid`)
        .setDescription(`Click the buttons to join or leave the raid party!\n Dungeon closes in 60 seconds!\nParty Size: 0\nParty CP: 0\n**${boss.id}**`)
        .setImage(`${boss.icon}`)
        .setFooter(`reward: ${rewardSelection.id}`)

        if (boss.rareBoss){
            newEmbed.setTitle("<a:siren:937423605912969316> <a:siren:937423605912969316> A Rare Raid Boss Has Appeared! <a:siren:937423605912969316> <a:siren:937423605912969316>");
        }

        message.channel.send({ embeds: [newEmbed], components: [row]}).then(sent => {
            let entries = [];
            let totalPartyCP = 0;
            const collector = sent.createMessageComponentCollector({componentType: 'BUTTON', time: 60000});

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
                            .setAuthor(`${users.username} has started a Raid`)
                            .setDescription(`Click the buttons to join or leave the raid party!\n Dungeon closes in 60 seconds!\nParty Size: ${entries.length}\nParty CP: ${new Intl.NumberFormat().format(totalPartyCP)}\n**${boss.id}**`)
                            .setImage(`${boss.icon}`)
                            .setFooter(`reward: ${rewardSelection.id}`)
                            if (boss.rareBoss){
                                newEmbedJoin.setTitle("<a:siren:937423605912969316> <a:siren:937423605912969316> A Rare Raid Boss Has Appeared! <a:siren:937423605912969316> <a:siren:937423605912969316>");
                            }
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
                            .setAuthor(`${users.username} has started a Raid`)
                            .setDescription(`Click the buttons to join or leave the raid party!\n Dungeon closes in 60 seconds!\nParty Size: ${entries.length}\nParty CP: ${new Intl.NumberFormat().format(totalPartyCP)}\n**${boss.id}**`)
                            .setImage(`${boss.icon}`)
                            .setFooter(`reward: ${rewardSelection.id}`)
                            if (boss.rareBoss){
                                newEmbedLeave.setTitle("<a:siren:937423605912969316> <a:siren:937423605912969316> A Rare Raid Boss Has Appeared! <a:siren:937423605912969316> <a:siren:937423605912969316>");
                            }
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
                numberOfMembers = entries.length;
                    for(let i = 0; i < entries.length; i++){
                        if (entries[i].CP > highestCP){
                            highestCP = entries[i].CP;
                        }
                    }
                
                if (rewardSelection.id === 'Boo Tao'){
                    
                    
                    let reward = 0;
                    bossHP = getRandomArbitrary((highestCP / 2) * numberOfMembers, (highestCP * numberOfMembers) + 1);
                    reward = Math.floor(100 * Math.log10(highestCP) * Math.sqrt(entries.length));
                    partyWon = totalPartyCP >= bossHP;

                    if (partyWon){
                        const newEmbed = new Discord.MessageEmbed()
                        .setColor('#E76AA3')
                        .setTitle(`Raid Won`)
                        .setDescription(`Congrats on defeating **${boss.id}** <a:HuTaoHype:878793570969063475>\nhere are some more details` )
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
                        .setDescription(`Looks like you got beat up by ${boss.id}, Try again later <a:milimcry:928779807783780392>`)
                        .addFields(
                            {name: 'Started By', value: `${users.username}`},
                            {name: 'Boss HP', value: `${new Intl.NumberFormat().format(bossHP)}`},
                            {name: 'Party CP', value: `${new Intl.NumberFormat().format(totalPartyCP)}`},
                            {name: 'Remaining HP', value: `${new Intl.NumberFormat().format(remainingHP)}`}
                        )
                        .setImage('https://media.discordapp.net/attachments/646489430777004045/930575510050836500/milimtrim.gif')

                        message.channel.send({ embeds: [newEmbed] })


                    }
                } else if (rewardSelection.id === 'Item'){
                    const items = [
                        { id: boss.items[0], weight: 50 },
                        { id: boss.items[1], weight: 40 },
                        { id: boss.items[2], weight: 35 },
                        { id: boss.items[3], weight: 25 },
                        { id: boss.items[4], weight: 10 },
                    ];
                    let rewardItem = lucky.itemBy(items, 'weight');
                    bossHP = getRandomArbitrary((highestCP / 2) * numberOfMembers, (highestCP * numberOfMembers) + 1);
                    partyWon = totalPartyCP >= bossHP;

                    if (partyWon){
                        const newEmbed = new Discord.MessageEmbed()
                        .setColor('#E76AA3')
                        .setTitle(`Raid Won`)
                        .setDescription(`Congrats on defeating **${boss.id}** <a:HuTaoHype:878793570969063475>\nhere are some more details` )
                        .addFields(
                            {name: 'Started By', value: `${users.username}`},
                            {name: 'Boss HP', value: `${new Intl.NumberFormat().format(bossHP)}`},
                            {name: 'Party CP', value: `${new Intl.NumberFormat().format(totalPartyCP)}`},
                            {name: 'Reward', value: `${rewardItem.id}`}
                        )
                        //message.channel.send(`Boss HP: ${new Intl.NumberFormat().format(bossHP)}\nParty CP: ${new Intl.NumberFormat().format(partyCP)}\nReward: ${new Intl.NumberFormat().format(reward)}\nWon? ${partyWon}`);
                        for (let j = 0; j < entries.length; j++){
                            pushItem(rewardItem.id, entries[j].user)
                            updateRaidCounter(entries[j].user);
                        }

                        message.channel.send({ embeds: [newEmbed] })
                        
                    } else {
                        
                        let remainingHP = bossHP - totalPartyCP;
                        const newEmbed = new Discord.MessageEmbed()
                        .setColor('#E76AA3')
                        .setTitle(`Raid Lost`)
                        .setDescription(`Looks like you got beat up by **${boss.id}**, Try again later <a:milimcry:928779807783780392>`)
                        .addFields(
                            {name: 'Started By', value: `${users.username}`},
                            {name: 'Boss HP', value: `${new Intl.NumberFormat().format(bossHP)}`},
                            {name: 'Party CP', value: `${new Intl.NumberFormat().format(totalPartyCP)}`},
                            {name: 'Remaining HP', value: `${new Intl.NumberFormat().format(remainingHP)}`}
                        )
                        .setImage('https://media.discordapp.net/attachments/646489430777004045/930575510050836500/milimtrim.gif')

                        message.channel.send({ embeds: [newEmbed] })


                    }

                }
            })

        })
        
        

        
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

async function pushItem(n, ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $push: {
                    items: n
                    
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}