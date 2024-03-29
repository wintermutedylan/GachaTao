const playerModel = require("../models/playerSchema");
var maids = require("../units/maids.json");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'raidhelp',
    aliases: [],
    permissions: [],
    description: "Displays all the commands a user and use",
    async execute(client, message, cmd, args, Discord, profileData){
        // let playerData; 
        // playerData = await playerModel.findOne({ userID: message.author.id});
        // if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        // var ID = message.author.id;
        
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#BE0000')
            .setTitle('Raid Commands')
            .setDescription(`**g$startraid** - opens a raid party (costs one raid ticket). 
            Anyone who reacts ✅ to the raid party embed within 60 seconds will automatically join the party. 
            The raid will begin after the 60 second mark. 
            To defeat the boss, the collective party's CP must be greater than the raid boss's CP. 
            > Rewards: 100 x log(HCP) x sqrt(#ofparticipants) 
            **g$raidhelp** - brings up this embed 
            **g$raidlb** - brings up weekly & all time raid leaderboard
            **g$startmegaraid** - opens a mega raid party (costs 1 ticket)
            > Instead of defeating the boss in one go, parties deal dmg to the boss depending on their CP
            **g$claimitems Blakninja The Forbidden One** - use to complete the raid unit once you've collected all the parts!
            **g$startmassraid** - opens a raid party (costs 5 tickets)
            > Just like normal raiding but faster~
            **RAID GUIDE**
            70% Normal
            30% RARE

            **DROPS**
            60% Bootao
            40% Item

            **TYPE**
            31% - right arm
            25% - left arm
            21% - right leg
            15% - left leg
            6% - head`)
            .setFooter("*Note: Once you start a raid, you lose 1 ticket. No refunds");

            message.channel.send({ embeds: [newEmbed] });
        
    }
}