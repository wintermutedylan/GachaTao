const { userMention, memberNicknameMention, channelMention, roleMention  } = require("@discordjs/builders");
var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
module.exports = {
    name: 'createProfile',
    aliases: ['register', 'create'],
    permissions: [],
    description: "Create user profile",
    async execute(client, message, cmd, args, Discord){
        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});

        var selected = playerData.starterSelected;
        var unitSelected = "";
        if (selected) return message.reply("You've already selected and registered, you can't do it again, baka!")
        let userStuff = await client.users.fetch(message.author.id);

        // let allPlayerData = await playerModel.find({});
        // var sorted = allPlayerData.sort((a, b) => (b.totalCP) - (a.totalCP));
        // var pos;

        // for (let i = 0; i < sorted.length; i++){
        //     pos = i + 1;
        //     try {
        //         await playerModel.findOneAndUpdate(
        //             {
        //                 userID: sorted[i].userID
        //             },
        //             {
        //                 $set: {
        //                     position: pos,
        //                 },
        //             }
        //         );

        //     } catch(err){
        //         console.log(err);
        //     }
        // }
        // let raidSorted = allPlayerData.sort((a, b) => (b.raidsWon) - (a.raidsWon));
        // let raidPos;

        // for (let i = 0; i < raidSorted.length; i++){
        //     raidPos = i + 1;
        //     try {
        //         await playerModel.findOneAndUpdate(
        //             {
        //                 userID: raidSorted[i].userID
        //             },
        //             {
        //                 $set: {
        //                     raidPosition: raidPos,
        //                 },
        //             }
        //         );

        //     } catch(err){
        //         console.log(err);
        //     }
        // }
        
        message.channel.send(`${userMention(message.author.id)} Profile created.  Please select a starter between, Smug, Ren, Dana (Type the name, Baka)`);
        


        

        
        var ID = message.author.id;
        

        const filter = (m) => {
            return  m.author.id === message.author.id && (m.content.toLowerCase() === 'smug' || m.content.toLowerCase() === 'dana' || m.content.toLowerCase() === 'ren');
        }
        const collector = message.channel.createMessageCollector({ filter, max: 1, time: 60000})
        var s;
        
        

        collector.on('collect', message => {
            s = message.content;
            
        });

        collector.on('end', collected => {
        
            if (collected.size === 0) {
                
                
                
                    message.channel.send(`${userMention(message.author.id)} You did not select a starter in time.`)
                
                return
            }
            
                if (s.toLowerCase() == 'smug'){
                    
                    unitSelected = "Sewage Monster Smug";
                    
                    const newEmbed = new Discord.MessageEmbed()
                    .setColor('#E76AA3')
                    .setTitle(`<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> **Sewage Monster Smug**`)
                    .setDescription(`${userMention(message.author.id)} has selected **Sewage Monster Smug** as their Starter`)
                    .setImage('https://media.discordapp.net/attachments/930577252406685726/930577317552590878/smug.png')
                    .setFooter('Congrats');
                    
                    
                    message.channel.send({ embeds: [newEmbed] });
                    
                    
                    addUnit(unitSelected, ID);
                    message.channel.send(`**${unitSelected}** has been added to your account ${userMention(ID)}`);
                    
                   

                }
                else if (s.toLowerCase() == 'dana'){
                    unitSelected = "Guardian Angel Dana";
                    
                    const newEmbed = new Discord.MessageEmbed()
                    .setColor('#E76AA3')
                    .setTitle(`<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> **Guardian Angel Dana**`)
                    .setDescription(`${userMention(message.author.id)} has selected **Guardian Angel Dana** as their Starter`)
                    .setImage('https://media.discordapp.net/attachments/930577252406685726/930577316902494208/dana.png')
                    .setFooter('Congrats');
                    
                    
                        message.channel.send({ embeds: [newEmbed] });
                    
                    
                    addUnit(unitSelected, ID);
                    message.channel.send(`**${unitSelected}** has been added to your account ${userMention(ID)}`);
                    
                }
                else if (s.toLowerCase() == 'ren'){
                    unitSelected = "Idol Ren";
                    
                    const newEmbed = new Discord.MessageEmbed()
                    .setColor('#E76AA3')
                    .setTitle(`<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> **Idol Ren**`)
                    .setDescription(`${userMention(message.author.id)} has selected **Idol Ren** as their Starter`)
                    .setImage('https://media.discordapp.net/attachments/930577252406685726/930577317170917446/idolren.png?width=910&height=910')
                    .setFooter('Congrats');
                    
                    
                        message.channel.send({ embeds: [newEmbed] });
                    
                    addUnit(unitSelected, ID);
                    message.channel.send(`**${unitSelected}** has been added to your account ${userMention(ID)}`);
                    
                }

                else {
                    
                    
                    
                        message.channel.send(`${userMention(message.author.id)} Please run Register command again and select from Smug, Dana, or Ren, baka!`)
                    
            }
            
            
            

            
            
        });

        
    }
}

async function addUnit(unitName, ID){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $push: {
                    maids: { unit: unitName, dupes: 0 }
                },
            }
        );
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $set: {
                    starterSelected: true,
                    starterName: unitName
                },
            }
        );
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $inc: {
                    
                    coins: 500,
                    totalCP: 10000
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}