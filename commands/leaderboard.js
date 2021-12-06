var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    permissions: [],
    description: "leaderboard for users.  based off CP",
    async execute(client, message,cmd,args,Discord){
        let allPlayerData = await playerModel.find({});
        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});
        if (args.length > 1) {
            return message.reply('Please only enter one number');
        }
        if (args.length === 0){
            args.push('1');
        }
        var pageNumber = args[0];
        var pos;

        var sorted = allPlayerData.sort((a, b) => (b.totalCP) - (a.totalCP));
        

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

        pageNumber = Number(pageNumber) - 1; 
        if (sorted.length > 10) sorted = sorted.slice(pageNumber * 10, pageNumber * 10 + 10);


        pos = 0;
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')
        .setTitle("**Leaderboard**")
        .setDescription(`__**Your Ranking: ${playerData.position}**__`)
        
        for (let j = 0; j < sorted.length; j++){
            pos = j + 1;
            let user = await client.users.fetch(sorted[j].userID);
            newEmbed.addFields(
                { name: `#${Number(pos) + Number(pageNumber) * 10}: ${user.username}#${user.discriminator}`, value: `CP: ${new Intl.NumberFormat().format(sorted[j].totalCP)}`}
            )


        }
        pageNumber++;
        newEmbed.setFooter(`Page # ${pageNumber}`)
        message.channel.send({ embeds: [newEmbed] });


    }
}