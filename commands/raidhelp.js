const playerModel = require("../models/playerSchema");
var maids = require("../units/maids.json");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'raidhelp',
    aliases: [],
    permissions: [],
    description: "Displays all the commands a user and use",
    async execute(client, message, cmd, args, Discord, profileData){
        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});
        if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        var ID = message.author.id;
        
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#BE0000')
            .setTitle('Raid Commands')
            .setDescription("**g$startraid** - opens a raid party (costs one raid ticket). \nAnyone who reacts ✅ to the raid party embed within 60 seconds will automatically join the party. \nThe raid will begin after the 60 second mark. \nTo defeat the boss, the collective party's CP must be greater than the raid boss's CP. \n> Rewards: 1 Boo Tao for every 2,000 Raid Boss CP \n**g$raidhelp** - brings up this embed \n**g$raidlb** - brings up weekly & all time raid leaderboard")
            .setFooter("*Note that rates are rounded and therefore will not add to 100%");

            message.channel.send({ embeds: [newEmbed] });
        
    }
}