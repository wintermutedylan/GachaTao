var maids = require("../units/maids.json");
var quests = require("../units/quests.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const lucky = require('lucky-item').default;
module.exports = {
    name: 'completedquests',
    aliases: ['myquests', 'myquestcomplete', 'mycompletedquests'],
    permissions: [],
    description: "steal Boo Taos from a specific user",
    async execute(client, message,cmd,args,Discord){

        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});
        if (!playerData) return message.channel.send("This player doesn't exist. Please try again.");
        if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");

        let questList = playerData.questsComplete;
        let questNames = [];
        if (questList.includes("160")){
            const index = questList.indexOf("160");
            if (index > -1){
                questList.splice(index, 1);
            }
        }
        
        for (let j = 0; j < questList.length; j++){
            for (let k = 0; k < quests.length; k++)
            if (questList[j] === quests[k].number){
                questNames.push(quests[k].name);
            }
        }
        
        let user = await client.users.fetch(message.author.id);
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#E76AA3')
            .setTitle(`${user.username}'s Completed Quests`)
            
            for (let i = 0; i < questNames.length; i++){
                newEmbed.setDescription(`**${questNames[i]}**\n`)
            }
            
        

            message.channel.send({ embeds: [newEmbed]});

    }
}