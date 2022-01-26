var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'testmilim',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "embeds",
    async execute(client, message,cmd,args,Discord){

        
        
        



        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')
        .setTitle("Arcade Tao")
        .setURL('https://discord.gg/ganyumains')
        .setDescription("Milim!!!!!!!!!")
        .setImage('https://drive.google.com/uc?id=1p5CPIWnELNnmO_1kBTunTjhZ6foeulOf')
        .addFields(
            {name: 'Rule 1', value: 'Be nice'},
            {name: 'Rule 2', value: 'Praise Milim :heart: '},
            {name: 'Rule 3', value: 'bully melody <:hehehe:850914083967729676>'}

        )
        
        .setFooter('MILIM');
        

        
        
        

        message.channel.send({ embeds: [newEmbed]});
        
        

        
    }

    
}
