var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'shortprofile',
    aliases: ['sp','sprofile'],
    permissions: [],
    description: "embeds",
    async execute(client, message,cmd,args,Discord){
        
        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});
        if (!playerData) return message.channel.send("You don't exist. Please try again.");
        if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        let totalCP = playerData.totalCP;
        let totalCoins = playerData.coins;
       
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')
        .setAuthor(`${message.author.username}'s Condensed Profile`)
        .setDescription(`**Total CP:** ${new Intl.NumberFormat().format(totalCP)} 
        **Total<:bootaomonez:909294739197681754>:** ${new Intl.NumberFormat().format(totalCoins)} 
        **Raid Tickets:** ${playerData.raidTickets} 
        **Raids Won:** ${playerData.raidsWon} 
        **Weekly Raids Won:** ${playerData.weeklyRaidsWon}
        **Damage Done to Mega Boss:** ${new Intl.NumberFormat().format(playerData.megaRaidDamageDone)}`)
        .setThumbnail(message.author.avatarURL())

        
        
        
        message.channel.send({ embeds: [newEmbed] });
        
        
        
    }
    
}