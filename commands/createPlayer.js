const { userMention } = require("@discordjs/builders");
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

        let allPlayerData = await playerModel.find({});
        var sorted = allPlayerData.sort((a, b) => (b.totalCP) - (a.totalCP));
        var pos;

        for (let i = 0; i < sorted.length; i++){
            pos = i + 1;
            try {
                await playerModel.findOneAndUpdate(
                    {
                        userID: sorted[i].userID
                    },
                    {
                        $set: {
                            position: pos,
                        },
                    }
                );

            } catch(err){
                console.log(err);
            }
        }


        

        message.reply('Profile created.  Please select a starter between, Smug, Ren, Dana (Type the name, Baka)');
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
                
                message.reply ('You did not select a starter in time.')
                return
            }
            
                if (s.toLowerCase() == 'smug'){
                    
                    unitSelected = "Sewage Monster Smug";
                    const newEmbed = new Discord.MessageEmbed()
                    .setColor('#E76AA3')
                    .setTitle(`<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> **Sewage Monster Smug**`)
                    .setDescription(`${userMention(message.author.id)} has selected **Sewage Monster Smug** as their Starter`)
                    .setImage(`https://cdn.discordapp.com/attachments/907801558765420544/908894961884356659/16f2024f5e4b4087c436856aced7fdc5.png`)
                    .setFooter('Congrats');
                    message.reply({ embeds: [newEmbed] });
                    //client.channels.cache.get("853101428875984957").send(`g$addunit ${unitSelected} ${ID} ${message.channel.id}`);
                    addUnit(unitSelected, ID);
                    message.channel.send(`**${unitSelected}** has been added to your account ${userMention(ID)}`);
                    
                   

                }
                else if (s.toLowerCase() == 'dana'){
                    unitSelected = "Guardian Angel Dana";
                    const newEmbed = new Discord.MessageEmbed()
                    .setColor('#E76AA3')
                    .setTitle(`<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> **Guardian Angel Dana**`)
                    .setDescription(`${userMention(message.author.id)} has selected **Guardian Angel Dana** as their Starter`)
                    .setImage(`https://cdn.discordapp.com/attachments/907801558765420544/908894962119213056/9f76c1d99bb40b33d6061121642ee161.png`)
                    .setFooter('Congrats');
                    message.reply({ embeds: [newEmbed] });
                    //client.channels.cache.get("853101428875984957").send(`g$addunit ${unitSelected} ${ID} ${message.channel.id}`);
                    addUnit(unitSelected, ID);
                    message.channel.send(`**${unitSelected}** has been added to your account ${userMention(ID)}`);
                    
                }
                else if (s.toLowerCase() == 'ren'){
                    unitSelected = "Idol Ren";
                    const newEmbed = new Discord.MessageEmbed()
                    .setColor('#E76AA3')
                    .setTitle(`<a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> <a:pinkstar:907752258870075462> **Idol Ren**`)
                    .setDescription(`${userMention(message.author.id)} has selected **Idol Ren** as their Starter`)
                    .setImage(`https://cdn.discordapp.com/attachments/907801558765420544/908894961615900702/d2c632b56b38b6c188a67bd5552804b9.png`)
                    .setFooter('Congrats');
                    message.reply({ embeds: [newEmbed] });
                    addUnit(unitSelected, ID);
                    message.channel.send(`**${unitSelected}** has been added to your account ${userMention(ID)}`);
                    
                }

                else {
                    
                    message.reply("Please run Register command again and select from Smug, Dana, or Ren, baka!")
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
                    coins: 500,
                    totalCP: 10000
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}