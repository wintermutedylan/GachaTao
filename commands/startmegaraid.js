var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const bossModel = require("../models/bossSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const lucky = require('lucky-item').default;
const { MessageActionRow } = require("discord.js");
const progressbar = require('string-progressbar');
module.exports = {
    name: 'startmegaraid',
    aliases: [],
    permissions: [],
    description: "battle a raid boss",
    async execute(client, message,cmd,args,Discord){
        
        let allPlayerData = await playerModel.find({});
        let allBossData = await bossModel.find({});
        let boss = allBossData[0];
        var line = '🟥'
        var slider = '🟩';
        if (boss.currentHP === 0) return message.channel.send("Boss is already dead. Congrats");
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
        
        var users = await client.users.fetch(message.author.id);
        let raidStarter = users.username;
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')
        .setTitle(`${users.username} has started a Mega Raid`)
        .setDescription(`React with ✅ here to join the raid party!\n Dungeon closes in 60 seconds!
        **${boss.bossName}**
        Current HP: ${progressbar.filledBar(boss.totalHP, boss.currentHP, 10, line, slider)[0]}
        HP: ${new Intl.NumberFormat().format(boss.currentHP)}/${new Intl.NumberFormat().format(boss.totalHP)}`)
        .setImage(`${boss.bossIcon}`)
        
    
        message.channel.send({ embeds: [newEmbed] }).then(sent => {
            
            let entries = [];
                    
            sent.react('✅')
            
            const filter = (reaction, user) => {
                return user.id != sent.author.id && (reaction.emoji.name === '✅'); 
            }       

            const collector = sent.createReactionCollector({ filter, time: 60000});
            //collecting the reactions and updating the embed
            
            
                collector.on('collect', (reaction, user) => {
                    
                    var userCP = 0;
                    let userRaidsDone;
                    let A = Date.now();
                    if (userHasProfile(message, user.id)){
                        for (let i = 0; i < allPlayerData.length; i++){
                            if (allPlayerData[i].userID === user.id){
                                userCP = allPlayerData[i].totalCP;
                                userRaidsDone = allPlayerData[i].dailyRaidsPlayed;
                                
                            }
                        }
                        
                        
                        
                            if (!entries.some( vendor => vendor['user'] === user.id )){
                                
                                // if (userRaidsDone >= 10 && user.id != message.author.id ){//!= message.author.id
                                //     message.channel.send(`${userMention(user.id)} you have reached your raid cap for the day`);
                                // }
                                if (user.id === "618884909494304808" || user.id === "238364422135873536"){
                                    setDailyRaids(A, user.id);
                                    entries.push({ user: user.id, CP: userCP});
                                
                                    message.channel.send(`${userMention(user.id)} you have been added to the Mega Raid party with a CP of ${new Intl.NumberFormat().format(userCP)} ~ Good Luck!`);
                                }
                                else if (A - userRaidsDone < 300000 && user.id != message.author.id){
                                    const ds = new Date(A - userRaidsDone);
                                    let minutes = 4 - ds.getMinutes();
                                    let seconds = 60 - ds.getSeconds();
                                    return message.channel.send(`${userMention(user.id)} You must wait ${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)} minutes before you can raid again`);
                                }                       
                                else {
                                    setDailyRaids(A, user.id);
                                    entries.push({ user: user.id, CP: userCP});
                                
                                    message.channel.send(`${userMention(user.id)} you have been added to the Mega Raid party with a CP of ${new Intl.NumberFormat().format(userCP)} ~ Good Luck!`);
                                }
                            }
                    
                    } 
                    
                    
                    
                })
            
          

            collector.on('end', collected => {
                
                
                let highestDMG = 0;
                let highestUser;
                let killedBoss = false;
                let arr1 = getUniqueListBy(entries, 'user');
                for(let i = 0; i < arr1.length; i++){
                    if (arr1[i].CP > highestDMG){
                        highestDMG = arr1[i].CP;
                        highestUser = arr1[i].user;
                    }
                }
                for (let p = 0; p < arr1.length; p++){
                    partyCP = partyCP + arr1[p].CP;
                }
                let afterHP = boss.currentHP - partyCP;
                if (afterHP <= 0) {
                    killedBoss = true;
                    afterHP = 0;
                }
                
                minusBossHP(afterHP, boss.bossName);
                const newEmbed = new Discord.MessageEmbed()
                .setColor('#E76AA3')
                .setTitle(`Raid Won`)
                .setDescription(`You dealt some damage to **${boss.bossName}**
                Here are some stats` )
                .addFields(
                    {name: 'Started By', value: `${raidStarter}`},
                    {name: 'Dealt the Most DMG', value: `${userMention(highestUser)}`},
                    {name: 'Party CP', value: `${new Intl.NumberFormat().format(partyCP)}`},
                    {name: 'Remaining HP', value: `${progressbar.filledBar(boss.totalHP, afterHP, 10, line, slider)[0]}
                    ${new Intl.NumberFormat().format(afterHP)}/${new Intl.NumberFormat().format(boss.totalHP)}`}
                )
                
                for (let j = 0; j < arr1.length; j++){
                    updateDamageDone(arr1[j].CP, arr1[j].user);
                    
                }

                message.reply({ embeds: [newEmbed] })
                if (killedBoss){
                    message.channel.send("Congrats on killing this weeks Mega boss. \nCome back next week for another round")
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
        if (!authorData)  {
            message.channel.send(`${userMention(ID)} Looks like there was an error finding your profile .  Try running g$register then try again`);
            return false;
        }
        else if (authorData.starterSelected === false) message.channel.send(`${userMention(ID)} You need to run g$register first before anything else`);
        return false;
    }

}

async function updateDamageDone(ammount, ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $inc: {
                    megaRaidDamageDone: ammount
                    
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
async function minusBossHP(ammount, ID){
    try {
        await bossModel.findOneAndUpdate(
            {
                bossName: ID
            },
            {
                $set: {
                    currentHP: ammount
                    
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