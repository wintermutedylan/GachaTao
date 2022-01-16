var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'megaraidleaderboard',
    aliases: ['megaraidlb', 'rlb'],
    permissions: [],
    description: "leaderboard for users.  based off raids won",
    async execute(client, message,cmd,args,Discord){
        let allPlayerData = await playerModel.find({});
        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});
        if (!playerData) return message.reply("Looks like there was an error finding your profile.  Try running g$register then try again");
        if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        if (args.length > 1) {
            return message.reply('Please only enter one number');
        }
        if (args.length === 0){
            args.push('1');
        }
        var pageNumber = args[0];
        var pos;

        var sorted = allPlayerData.sort((a, b) => (b.megaRaidDamageDone) - (a.megaRaidDamageDone));
        

        for (let i = 0; i < sorted.length; i++){
            pos = i + 1;
            try {
                await playerModel.findOneAndUpdate(
                    {
                        userID: sorted[i].userID
                    },
                    {
                        $set: {
                            raidPosition: pos,
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
        .setTitle("**Raid Leaderboard**")
        .setDescription(`__**Your Ranking: ${playerData.raidPosition}**__`)
        
        for (let j = 0; j < sorted.length; j++){
            pos = j + 1;
            let user = await client.users.fetch(sorted[j].userID);
            newEmbed.addFields(
                { name: `#${Number(pos) + Number(pageNumber) * 10}: ${user.username}#${user.discriminator}`, value: `Total Damage Done: ${new Intl.NumberFormat().format(sorted[j].megaRaidDamageDone)}`}
            )


        }
        pageNumber++;
        newEmbed.setFooter(`Page # ${pageNumber}`)
        message.channel.send({ embeds: [newEmbed] });


    }
}