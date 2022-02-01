var maids = require("../units/maids.json");
var quests = require("../units/quests.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const lucky = require('lucky-item').default;
module.exports = {
    name: 'myitems',
    aliases: [],
    permissions: [],
    description: "my items",
    async execute(client, message,cmd,args,Discord){
        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});
        if (!playerData) return message.channel.send("You don't exist. Please try again.");
        if (playerData.starterSelected === false) return message.reply("you needs to run g$register first before anything else");
        let totalItems = playerData.items;
        let rightArmCount = 0;
        let leftArmCount = 0;
        let rightLegCount = 0;
        let leftLegCount = 0;
        let headCount = 0;

        for (let i = 0; i < totalItems.length; i++){
            switch (totalItems[i]){
                case "Blakninja's Right Arm":
                    rightArmCount++;
                    break;
                case "Blakninja's Left Arm":
                    leftArmCount++;
                    break;
                case "Blakninja's Right Leg":
                    rightLegCount++;
                    break;
                case "Blakninja's Left Leg":
                    leftLegCount++;
                    break;
                case "Blakninja's Head":
                    headCount++;
                    break;

                
            }

        }
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')
        .setAuthor(`${message.author.username}'s Items`)
        .setDescription("These are your items that you currently have")
        .addFields(
            {name: "Blakninja's Right Arm", value: `Count: ${rightArmCount}`},
            {name: "Blakninja's Left Arm", value: `Count: ${leftArmCount}`},
            {name: "Blakninja's Right Leg", value: `Count: ${rightLegCount}`},
            {name: "Blakninja's Left Leg", value: `Count: ${leftLegCount}`},
            {name: "Blakninja's Head", value: `Count: ${headCount}`}
        )
        .setThumbnail(message.author.avatarURL())

        
        
        
        message.channel.send({ embeds: [newEmbed] });

    }
}