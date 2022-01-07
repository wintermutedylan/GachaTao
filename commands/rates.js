const playerModel = require("../models/playerSchema");
var maids = require("../units/maids.json");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'rates',
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
            .setTitle('Rates')
            .setDescription('SSR - 0.1% chance \nLR - 0.5% chance \nUR - 2% chance \nSR - 15% chance \nR - 20% chance \nUC - 25% chance \nC - 34% chance')
            .setFooter("*Note that rates are rounded and therefore will not add to 100%");

            message.channel.send({ embeds: [newEmbed] });
        
    }
}
