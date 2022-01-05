const playerModel = require("../models/playerSchema");
var maids = require("../units/maids.json");
var quiz = require("../questions/question.json");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');

module.exports = {
    name: 'drop',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Give coins to users",
    async execute(client, message, cmd, args, Discord){
        //return message.channel.send("Under Construction.  Will make an annoucment when done");
        if (args.length === 0) return message.reply("Please enter a channel ID");
        var channels = args[0];
        var amount = getRandomArbitrary(150, 1001);
        const item = quiz[Math.floor(Math.random() * quiz.length)];
        const filter = response => {
	        return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        };
        client.channels.cache.get(channels).send(item.question, { fetchReply: true })
            .then(() => {
                client.channels.cache.get(channels).awaitMessages({ filter, max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                        client.channels.cache.get(channels).send(`${collected.first().author} got the correct answer!`);
                        client.channels.cache.get(channels).send(`${collected.first().author.username} has been given ${amount}<:bootaomonez:909294739197681754>, Pog`);
                        giveCoins(amount, collected.first().author.id);
                        
                    })
                    .catch(collected => {
                        client.channels.cache.get(channels).send('Looks like nobody got the answer this time.');
                    });
            });


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
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}