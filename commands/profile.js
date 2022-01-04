var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'profile',
    aliases: ['p','units'],
    permissions: [],
    description: "embeds",
    async execute(client, message,cmd,args,Discord){
        if (args.length > 1) {
            return message.reply('Please only enter one number');
        }
        if (args.length === 0){
            args.push('1');
        }
        var pageNumber = args[0];
        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});
        if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        
        var sorted = [];
        var totalCP = playerData.totalCP;
        var totalCoins = playerData.coins;
        var starterName;
        var awkNeeded;
        
        for (let i = 0; i < playerData.maids.length; i++){
            for (let j = 0; j < maids.length; j++){
                if (playerData.maids[i].unit === maids[j].id){
                    sorted.push(maids[j]); 
                }
                if (playerData.maids[i].unit === maids[2].id){
                    starterName = "Sewage Monster Smug";
                    awkNeeded = maids[2].awakenThreshold;
                } else if (playerData.maids[i].unit === maids[3].id){
                    starterName = "Idol Ren";
                    awkNeeded = maids[3].awakenThreshold;
                } else if (playerData.maids[i].unit === maids[4].id){
                    starterName = "Guardian Angel Dana";
                    awkNeeded = maids[4].awakenThreshold;
                } 
        }
        }
        sorted.sort((a, b) => (a.rValue - b.rValue || b.CP - a.CP));
        for (let location = 0; location < playerData.maids.length; location++){
            if (playerData.maids[location].unit === starterName){
                
                var owned = playerData.maids[location].dupes;
                owned++;
                if (owned === awkNeeded){
                    awkThisUnit = true;
                }
                if (totalCP <= 15000 && playerData.starterDupes === 0){
                    addStarter(location, message.author.id, owned);
                } else if (totalCP <= 25000 && playerData.starterDupes === 1){
                    addStarter(location, message.author.id, owned);
                } else if (totalCP <= 45000 && playerData.starterDupes === 2){
                    addStarter(location, message.author.id, owned);
                } else if (totalCP <= 60000 && playerData.starterDupes === 3){
                    addStarter(location, message.author.id, owned);
                } else if (totalCP <= 75000 && playerData.starterDupes === 4){
                    addStarter(location, message.author.id, owned);
                }
                
                
                have = true;
                break;
            }
        }

        
        
        
        
        
        
        var user = await client.users.fetch(ID);
        message.reply(`**${unitName}** has been added to ${user.username}#${user.discriminator}`);
        if (awkThisUnit){
            try {
                
                await playerModel.findOneAndUpdate(
                    {
                        userID: ID
                    },
                    {
                        $inc: {
                            starterDupes: 1,
                        },
                    }
                );
        
            } catch(err){
                console.log(err);
            }
            message.channel.send(`${userMention(message.author.id)} has just awoken ${unitName} congrats!`);
        }
        pageNumber = Number(pageNumber) - 1;
        
        
        if (sorted.length > 10) sorted = sorted.slice(pageNumber * 10, pageNumber * 10 + 10);
        

        pageNumber++;

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')
        .setAuthor(`${message.author.username}'s Units`)
        .setDescription(`Total CP: ${new Intl.NumberFormat().format(totalCP)} \nTotal<:bootaomonez:909294739197681754>: ${new Intl.NumberFormat().format(totalCoins)} \nLR Pity: ${playerData.lrPity} \nUR Pity: ${playerData.urPity}`)
        .setThumbnail(message.author.avatarURL())
        .setFooter(`Page # ${pageNumber}`)

        for (let k = 0; k < sorted.length; k++){
            var dupeValue = 0;
            
            for (let d = 0; d < playerData.maids.length; d++){
                if (sorted[k].id === playerData.maids[d].unit){
                    dupeValue = playerData.maids[d].dupes;
                    if (dupeValue >= sorted[k].awakenThreshold){
                        newEmbed.addFields(
                            { name: `**${sorted[k].rarity}: ${sorted[k].id}**`, value: `Dupes: ${dupeValue}, Awoken, \nCP: ${new Intl.NumberFormat().format(sorted[k].CP * 1.5)}`}
                        )
                    } else {
                    
                    
                    newEmbed.addFields(
                        { name: `**${sorted[k].rarity}: ${sorted[k].id}**`, value: `Dupes: ${dupeValue}, \nCP: ${new Intl.NumberFormat().format(sorted[k].CP)}`}
                    )
                }
                }
            }
        }
        
        
        message.channel.send({ embeds: [newEmbed] });
        
        

        
    }

    
}
async function addStarter(location, ID, owned){
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $set: {
                    ["maids." + location + ".dupes"]: owned
                },
            }
        );
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $inc: {
                    starterDupes: 1,
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}