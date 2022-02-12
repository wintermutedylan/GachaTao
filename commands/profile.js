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
        if (!playerData) return message.channel.send("You don't exist. Please try again.");
        if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        
        var sorted = [];
        var totalCP = playerData.totalCP;
        var totalCoins = playerData.coins;
        let milimArray = playerData.milimsOwned;
        let milimString = "";
        
        for (let i = 0; i < playerData.maids.length; i++){
            for (let j = 0; j < maids.length; j++){
                if (playerData.maids[i].unit === maids[j].id){
                    sorted.push(maids[j]);
                    
                    
                }
            }
        }
        // try {
        //     await playerModel.findOneAndUpdate(
        //         {
        //             userID: message.author.id
        //         },
        //         {
        //             $set: {
        //                 milimsOwned: ["<:maidpriscilla:931957660281090068>", "<:milimheart:850916496821059644>"],
        //             },
        //         }
        //     );
    
        // } catch(err){
        //     console.log(err);
        // }
        

        sorted.sort((a, b) => (a.rValue - b.rValue || b.CP - a.CP));
        
        if(milimArray.length != 0){  
            for (let i = 0; i < milimArray.length; i++){
                milimString = milimString + milimArray[i];
            }   
        }
        
        
        
       
        pageNumber = Number(pageNumber) - 1;
        
        
        if (sorted.length > 10) sorted = sorted.slice(pageNumber * 10, pageNumber * 10 + 10);
        
        pageNumber++;
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')
        .setAuthor(`${message.author.username}'s Units`)
        .setDescription(`**Total CP:** ${new Intl.NumberFormat().format(totalCP)} 
        **Total<:bootaomonez:909294739197681754>:** ${new Intl.NumberFormat().format(totalCoins)} 
        **Raid Tickets:** ${playerData.raidTickets} 
        **Raids Won:** ${playerData.raidsWon} 
        **Weekly Raids Won:** ${playerData.weeklyRaidsWon} 
        **LR Pity:** ${playerData.lrPity} 
        **UR Pity:** ${playerData.urPity}
        ${milimString}`)
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