var maids = require("../units/maids.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'testmilim',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "embeds",
    async execute(client, message,cmd,args,Discord){

        
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('join')
                .setLabel('Join Raid')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('leave')
                .setLabel('Leave Raid')
                .setStyle('DANGER')
        );
        



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
        

        
        
        

        message.channel.send({ embeds: [newEmbed], components: [row]}).then(sent => {
            const collector = sent.createMessageComponentCollector({componentType: 'BUTTON', time: 15000});

            collector.on('collect', i => {
                if (i.customId === 'join'){
                    i.reply(`${i.user.id} clicked on the ${i.customId} button.`)
                } else if (i.customId === 'leave'){
                    i.reply(`${i.user.id} clicked on the ${i.customId} button.`)
                }
            })

            collector.on('end', collected => {
                message.channel.send(`Collected ${collected.size} interactions.`)
            })

        })
        
        

        
    }

    
}
