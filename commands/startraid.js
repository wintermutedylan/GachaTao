var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const lucky = require('lucky-item').default;
module.exports = {
    name: 'startraid',
    aliases: [],
    permissions: [],
    description: "battle a raid boss",
    async execute(client, message,cmd,args,Discord){
        
        let allPlayerData = await playerModel.find({});
        let authorData; 
        authorData = await playerModel.findOne({ userID: message.author.id});
        var currentTime = message.createdTimestamp;
        let partyCP = 0;
        
        if (!authorData) return message.reply("Looks like there was an error finding your profile.  Try running g$register then try again");
        if (authorData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        if (authorData.raidTickets === 0) return message.reply("You have no more Raid Tickets to use");
        var timePassed = authorData.raidCD;

        if ((currentTime + 300000) - timePassed < 300000){
            return message.reply("You must wait 5 minutes before you can raid again");
        }
        removeTickets(1, message.author.id);
        var users = await client.users.fetch(message.author.id);
        let raidStarter = users.username;
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')
        .setTitle(`${users.username} has started a Raid`)
        .setDescription(`React with ✅ here to join the raid party!\n Dungeon closes in 60 seconds!`)
        
    
        message.channel.send({ embeds: [newEmbed] }).then(sent => {
            
            entries = [];
                    
            sent.react('✅')
            
            const filter = (reaction, user) => {
                return user.id != sent.author.id && (reaction.emoji.name === '✅'); 
            }       

            const collector = sent.createReactionCollector({ filter, time: 10000});
            //collecting the reactions and updating the embed
            
            
                collector.on('collect', (reaction, user) => {
                    
                    var userCP = 0;
                    
                    
                    
                    if (userHasProfile(message, user.id)){
                        for (let i = 0; i < allPlayerData.length; i++){
                            if (allPlayerData[i].userID === user.id){
                                userCP = allPlayerData[i].totalCP;
                                partyCP = partyCP + allPlayerData[i].totalCP;
                            }
                        }

                        entries.push({ user: user.id, CP: userCP});
                        message.channel.send(`${userMention(user.id)} you have been added to the Raid party with a CP of ${new Intl.NumberFormat().format(userCP)} ~ Good Luck!\n Current Party CP: ${new Intl.NumberFormat().format(partyCP)}`);
                    } 
                    
                    
                    
                })
            
          

            collector.on('end', collected => {
                
                let bossHP = 0;
                let highestCP = 0;
                let numberOfMembers = 0;
                let partyWon = false;
                let reward = 0;
                
                let arr1 = getUniqueListBy(entries, 'user');
                numberOfMembers = arr1.length;
                for(let i = 0; i < arr1.length; i++){
                    if (arr1[i].CP > highestCP){
                        highestCP = arr1[i].CP;
                    }
                }

                bossHP = getRandomArbitrary((highestCP / 2) * numberOfMembers, (highestCP * numberOfMembers) + 1);
                reward = Math.floor((bossHP / 1000) * 0.5);
                partyWon = partyCP >= bossHP;

                if (partyWon){
                    const newEmbed = new Discord.MessageEmbed()
                    .setColor('#E76AA3')
                    .setTitle(`Raid Won`)
                    .setDescription(`Congrats on winning the raid <a:HuTaoHype:878793570969063475>\nhere are some more details` )
                    .addFields(
                        {name: 'Started By', value: `${raidStarter}`},
                        {name: 'Boss HP', value: `${new Intl.NumberFormat().format(bossHP)}`},
                        {name: 'Party CP', value: `${new Intl.NumberFormat().format(partyCP)}`},
                        {name: 'Reward Amount', value: `${new Intl.NumberFormat().format(reward)}<:bootaomonez:909294739197681754>`}
                    )
                    //message.channel.send(`Boss HP: ${new Intl.NumberFormat().format(bossHP)}\nParty CP: ${new Intl.NumberFormat().format(partyCP)}\nReward: ${new Intl.NumberFormat().format(reward)}\nWon? ${partyWon}`);
                    for (let j = 0; j < arr1.length; j++){
                        giveCoins(reward, arr1[j].user);
                        updateRaidCounter(arr1[j].user);
                    }

                    message.channel.send({ embeds: [newEmbed] })
                    
                } else {
                    let remainingHP = bossHP - partyCP;
                    const newEmbed = new Discord.MessageEmbed()
                    .setColor('#E76AA3')
                    .setTitle(`Raid Lost`)
                    .setDescription(`Sorry for your loss <a:milimcry:928779807783780392>`)
                    .addFields(
                        {name: 'Started By', value: `${raidStarter}`},
                        {name: 'Boss HP', value: `${new Intl.NumberFormat().format(bossHP)}`},
                        {name: 'Party CP', value: `${new Intl.NumberFormat().format(partyCP)}`},
                        {name: 'Remaining HP', value: `${new Intl.NumberFormat().format(remainingHP)}`}
                    )

                    message.channel.send({ embeds: [newEmbed] })


                }

            });
        })

    }
}

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

async function userHasProfile(message, ID){
    let authorData; 
    authorData = await playerModel.findOne({ userID: ID});
    
    
    if (authorData && authorData.starterSelected === true){
        return true;
    } else {
        if (!authorData)  message.channel.send(`${userMention(ID)} Looks like there was an error finding your profile .  Try running g$register then try again`);
        if (authorData.starterSelected === false) message.channel.send(`${userMention(ID)} You need to run g$register first before anything else`);
        return false;
    }

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