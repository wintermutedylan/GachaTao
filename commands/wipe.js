var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'wipe',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "resets a user in the DB",
    async execute(client, message,cmd,args,Discord){
        if (args.length === 0) return message.reply("Please enter a user ID");
        var ID = args[0];

        let playerData;
        playerData = await playerModel.findOne({ userID: ID});
        if (!playerData) return message.channel.send("This player doesn't exist. Please try again.");

        var user = await client.users.fetch(ID);
        message.reply(`Are you sure you want to wipe ${user.username}#${user.discriminator}'s account? This is **Irreversible** \nConfirm \nCancel`);

        const filter = (m) => {
            return  m.author.id === message.author.id && (m.content.toLowerCase() === "confirm" || m.content.toLowerCase() === "cancel");
        }
        const collector = message.channel.createMessageCollector({ filter, max: 1, time: 10000});
        var s;

        collector.on('collect', message => {
            s = message.content;
        });

        collector.on('end', collected => {
        
            if (collected.size === 0) {
                
                message.reply ('You did not select a starter in time.')
                return
            }
            if (s === 'confirm'){
                wipePlayer(ID);
                message.channel.send(`you have reset ${user.username}#${user.discriminator}`);
            }
            else if (s === 'cancel'){
                message.channel.send(`you have not reset ${user.username}#${user.discriminator} run the command if you want to try again`);
            }
        });
        

    }
    
}
async function wipePlayer(i) {
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: i
            },
            {
                $set: {
                    userID: i,
                    coins: 0,
                    maids: [],
                    dailyReset: false,
                    starterSelected: false,
                    urPity: 0,
                    lrPity: 0,
                    totalCP: 0
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}