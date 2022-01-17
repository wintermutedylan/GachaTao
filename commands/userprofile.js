var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'userprofile',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "embeds",
    async execute(client, message,cmd,args,Discord){
        if (args.length === 0) return message.reply("Please enter a user ID");
        let ID = args[0];
        let playerData; 
        playerData = await playerModel.findOne({ userID: ID});
        if (!playerData) return message.channel.send("You don't exist. Please try again.");
        if (playerData.starterSelected === false) return message.reply("user needs to run g$register first before anything else");
        let totalCP = playerData.totalCP;
        let totalCoins = playerData.coins;
        var user = await client.users.fetch(ID);
       
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')
        .setAuthor(`${user.username}'s Condensed Profile`)
        .setDescription(`**Total CP:** ${new Intl.NumberFormat().format(totalCP)} 
        **Total<:bootaomonez:909294739197681754>:** ${new Intl.NumberFormat().format(totalCoins)} 
        **Raid Tickets:** ${playerData.raidTickets} 
        **Raids Won:** ${playerData.raidsWon} 
        **Weekly Raids Won:** ${playerData.weeklyRaidsWon}
        **Damage Done to Mega Boss:** ${new Intl.NumberFormat().format(playerData.megaRaidDamageDone)}`)

        
        
        
        message.channel.send({ embeds: [newEmbed] });
        
        
        
    }
    
}