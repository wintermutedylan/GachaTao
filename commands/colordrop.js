const playerModel = require("../models/playerSchema");
var maids = require("../units/maids.json");
var quiz = require("../questions/question.json");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');

module.exports = {
    name: 'colorgame',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Give coins to users",
    async execute(client, message, cmd, args, Discord){
        if (args.length === 0) return message.reply("Please enter a channel ID");
        if (args.length === 1) return message.reply("Please enter both a channel ID then the amount of rounds you would like");
        var channels = args[0];
        var roundLimit = args[1];
        var winnerSelected = false;
        var amount = getRandomArbitrary(100, 1001);
        var round = 1;
        
        var winners = [];
        var entries = [];
        var survivors = [];
        
        
            
            
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#E76AA3')
            .setTitle(`Color Drop Game round #${round}`)
            .setDescription(`Select a Color and pray that the color doesn't get selected\n if you get all the way to the end you will win ${amount}<:bootaomonez:909294739197681754>`)
        
            client.channels.cache.get(channels).send({ embeds: [newEmbed] }).then(sent => {
                
                
                startRound(sent, channels, roundLimit, amount, round, winners, entries, survivors, Discord, client);
                    
                
                    
                    // if (round === roundLimit){
                    //     for (let h = 0; h < survivors.length; h++){
                    //         winners.push(survivors[h]);

                    //     }
                    //     const newEmbed3 = new Discord.MessageEmbed()
                    //     .setColor('#E76AA3')
                    //     var splitAmount = Math.floor(amount / winners.length);
                    //     newEmbed3.setTitle(`Winners has been decided`)
                    //     var des = `Congrats to the winners\n `;
                    //     for (let i = 0; i < winners.length; i++){
                    //         des = des + `${winners[i]}\n`;
                    //     }
                    //     des = des + `Each winner has been awarded ${splitAmount}<:bootaomonez:909294739197681754>`;
                    //     client.channels.cache.get(channels).send({ embeds: [newEmbed3] });
                    //     winnerSelected = true; 
                    //     //add code here for a mercy system so the rounds don't go on forever
                    // }
                    // else if (survivors.length === 1){
                    //     winners.push(survivors[0]);
                    //     const newEmbed3 = new Discord.MessageEmbed()
                    //     .setColor('#E76AA3')
                    //     .setTitle(`A Winner has been decided`)
                    //     .setDescription(`Congrats to the winner ${winners[0]}\n you have been awarded ${amount}<:bootaomonez:909294739197681754>`)
                    //     client.channels.cache.get(channels).send({ embeds: [newEmbed3] });
                    //     winnerSelected = true; 
                    // }
                
                
                    
                })
                
            
        
            
            
        

        // if (winnerSelected){
        // const newEmbed3 = new Discord.MessageEmbed()
        //     .setColor('#E76AA3')
        //     if (winners.length === 1){
        //         newEmbed3.setTitle(`A Winner has been decided`)
        //         .setDescription(`Congrats to the winner ${winners[0]}\n you have been awarded ${amount}<:bootaomonez:909294739197681754>`)
        //     } else {
        //         var splitAmount = Math.floor(amount / winners.length);
        //         newEmbed3.setTitle(`Winners has been decided`)
        //         var des = `Congrats to the winners\n `;
        //         for (let i = 0; i < winners.length; i++){
        //             des = des + `${winners[i]}\n`;
        //         }
        //         des = des + `Each winner has been awarded ${splitAmount}<:bootaomonez:909294739197681754>`;
        //     }
        //     client.channels.cache.get(channels).send({ embeds: [newEmbed3] });
            
        // }


        
        
    }
}
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
}
function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
      if (arr[i].color === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }
async function startRound(sent, channels, roundLimit, amount, round, winners, entries, survivors, Discord, client){
                
                entries = [];
                
                sent.react('🟩')
                sent.react('🟥')
                sent.react('🟦')
                
                const filter = (reaction, user) => {
                    return user.id != sent.author.id && (reaction.emoji.name === '🟩' || reaction.emoji.name === '🟥' || reaction.emoji.name === '🟦');
                }
                const collector = sent.createReactionCollector({ filter, time: 30000});
                collector.on('collect', (reaction, user) => {
                    // console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);

                        entries.push({ user: user.id, color: reaction.emoji.name });
                    
                    
                })

                collector.on('end', collected => {
                    
                    var surv = [];
                    var arr1 = getUniqueListBy(entries, 'user')

                    if (round > 1){
                        for (let k = 0; k < arr1.length; k++){
                            for (let h = 0; h < survivors.length; h++){
                                if (arr1[k].user === survivors[h]){
                                    surv.push(arr1[k]);
                                }
                            }
                        }
                        arr1 = surv;
                    }
                    
                    
                    
                    
                    
                    var items = ['🟩', '🟥', '🟦'];
                    var item = items[Math.floor(Math.random()*items.length)];
                    
                    removeItemAll(arr1, item);
                    var desc = `The color ${item} was selected.\nThe following people will move on to round #${round + 1}\n `;
                    const newEmbed2 = new Discord.MessageEmbed()
                    .setColor('#E76AA3')
                    .setTitle(`Winners for round #${round}`)
                    
                    
                    for (let j = 0; j < arr1.length; j++){
                        desc = desc + `${userMention(arr1[j].user)}\n`;
                        survivors.push(arr1[j].user);
                    }
                    newEmbed2.setDescription(`${desc}`)

                    
                    client.channels.cache.get(channels).send({ embeds: [newEmbed2] });
                    
                    if (round === roundLimit){
                        for (let h = 0; h < survivors.length; h++){
                            winners.push(survivors[h]);

                        }
                        const newEmbed3 = new Discord.MessageEmbed()
                        .setColor('#E76AA3')
                        var splitAmount = Math.floor(amount / winners.length);
                        newEmbed3.setTitle(`Winners has been decided`)
                        var des = `Congrats to the winners\n `;
                        for (let i = 0; i < winners.length; i++){
                            des = des + `${userMention(winners[i])}\n`;
                        }
                        des = des + `Each winner has been awarded ${splitAmount}<:bootaomonez:909294739197681754>`;
                        client.channels.cache.get(channels).send({ embeds: [newEmbed3] });
                        winnerSelected = true; 
                        return;
                        //add code here for a mercy system so the rounds don't go on forever
                    }
                    else if (survivors.legnth === 0){
                        const newEmbed3 = new Discord.MessageEmbed()
                        .setColor('#E76AA3')
                        .setTitle(`There was no Winner this game. `)
                        .setDescription(`Please try again next time.`)
                        client.channels.cache.get(channels).send({ embeds: [newEmbed3] });
                        winnerSelected = true; 
                        return;
                    }
                    else if (survivors.length === 1){
                        winners.push(survivors[0]);
                        const newEmbed3 = new Discord.MessageEmbed()
                        .setColor('#E76AA3')
                        .setTitle(`A Winner has been decided`)
                        .setDescription(`Congrats to the winner ${userMention(winners[0])}\n you have been awarded ${amount}<:bootaomonez:909294739197681754>`)
                        client.channels.cache.get(channels).send({ embeds: [newEmbed3] });
                        winnerSelected = true; 
                        return;
                    }
                    else if (survivors.length > 1 && round != roundLimit){
                        winnerSelected = false;
                        
                        round++;
                        
                        const newEmbed = new Discord.MessageEmbed()
                        .setColor('#E76AA3')
                        .setTitle(`Color Drop Game round #${round}`)
                        .setDescription(`Select a Color and pray that the color doesn't get selected\n if you get all the way to the end you will win ${amount}<:bootaomonez:909294739197681754>`)
                    
                        client.channels.cache.get(channels).send({ embeds: [newEmbed] }).then(sent => {
                            startRound(sent, channels, roundLimit, amount, round, winners, entries, survivors, Discord, client);
                        })
                    }
                    return survivors;
                });
                
                
}