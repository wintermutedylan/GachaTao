var maids = require("../units/maids.json");
var quests = require("../units/quests.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const lucky = require('lucky-item').default;
module.exports = {
    name: 'unit',
    aliases: ['u', 'unitdetails'],
    permissions: [],
    description: "Complete a quest",
    async execute(client, message,cmd,args,Discord){
        
        if (args.length === 0) return message.reply("Please enter a unit name then a user ID");
            
            let unitName = args.join(" ");
            
            let isUnit = false;
            let rolledCP;
            let awkNeeded;
            let rolledRarity;
            let imageFile;
            let image;
            let rarityValue;
            for (let i = 0; i < maids.length; i++){
                if (unitName === maids[i].id){
                    isUnit = true;
                    image = maids[i].icon;
                    rolledCP = maids[i].CP;
                    awkNeeded = maids[i].awakenThreshold;
                    rolledRarity = maids[i].rarity;
                    rarityValue = maids[i].rValue;



                    
                }
            }
            if (!isUnit) return message.reply(`**${unitName}** is not a valid unit, Please enter a valid unit`);

            const newEmbed = new Discord.MessageEmbed()
            .setColor('#E76AA3')
            .setTitle(`${rolledRarity} ${unitName}`)
            .setDescription(`**CP**: ${new Intl.NumberFormat().format(rolledCP)}
            **Awaken Threshold**: ${awkNeeded}`)
            if (rarityValue <= 2){
                newEmbed.setImage(`${image}`)
            }
            
        

            message.channel.send({ embeds: [newEmbed]});

    }
}