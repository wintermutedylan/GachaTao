var maids = require("../units/maids.json");
var prestigeStuff = require("../units/prestigeinfo.json");
const playerModel = require("../models/playerSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    name: 'prestige',
    aliases: [],
    permissions: [],
    description: "Lets a player prestige/level up",
    async execute(client, message,cmd,args,Discord){
        let playerData; 
        playerData = await playerModel.findOne({ userID: message.author.id});
        if (!playerData) return message.reply("Looks like there was an error finding your profile.  Try running g$register then try again");
        if (playerData.starterSelected === false) return message.reply("You need to run g$register first before anything else");
        let ID = message.author.id;

        let playerCP = playerData.totalCP;
        let playerPrestigeLevel = playerData.prestigeLevel;

        if (playerPrestigeLevel === prestigeStuff.at(-1).level) return message.reply(`You have already reached the max Prestige level of ${playerPrestigeLevel}`);
        if (playerCP != prestigeStuff[playerPrestigeLevel].cpCap) return message.reply(`You are missing ${new Intl.NumberFormat().format(prestigeStuff[playerPrestigeLevel].cpCap - playerCP)} CP to Prestige to level ${playerPrestigeLevel + 1}`);

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('yes')
                .setLabel('Yes')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setCustomId('no')
                .setLabel('No')
                .setStyle('DANGER')
        );
        var users = await client.users.fetch(message.author.id);

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#E76AA3')
        .setTitle(`${users.username}'s Prestige Info`)
        .setDescription(`__**Click either Yes or No to confirm the Prestige**__
        **Prestige level:** ${playerPrestigeLevel} -> ${playerPrestigeLevel + 1}
        **CP Cap:** ${new Intl.NumberFormat().format(prestigeStuff[playerPrestigeLevel].cpCap)} -> ${new Intl.NumberFormat().format(prestigeStuff[playerPrestigeLevel + 1].cpCap)}
        **Daily Raid Cap:** ${prestigeStuff[playerPrestigeLevel].raidCap} -> ${prestigeStuff[playerPrestigeLevel + 1].raidCap}
        **Raid Bonus:** ${prestigeStuff[playerPrestigeLevel].raidBonus}% -> ${prestigeStuff[playerPrestigeLevel + 1].raidBonus}%`)
        .setTimestamp()

        const filter = i => {
            i.deferUpdate();
            return i.user.id === message.author.id;
        };

        message.channel.send({ embeds: [newEmbed], components: [row]}).then(sent => {
            sent.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 30000})
            .then(interaction => {
                if (interaction.customId === 'yes'){
                    updatePrestige(prestigeStuff, playerPrestigeLevel, playerData.maids.slice(0, 1), ID);
                    interaction.followUp(`You have successfully prestiged to level ${playerPrestigeLevel + 1}`)
                } else if(interaction.customId === 'no'){
                    interaction.followUp("You have cancelled the prestige")
                }
            })
            .catch(err => message.channel.send(`${userMention(ID)} you didn't respond in time. Please try again`))
        })





    }
}
async function updatePrestige(prestigeArray, playerLevel, unitArray, ID){
    unitArray[0].dupes = 0
    try {
        await playerModel.findOneAndUpdate(
            {
                userID: ID
            },
            {
                $set: {
                    maids: unitArray,
                    totalCP: 10000,
                    questsComplete: [],
                    items: [],
                    prestigeLevel: prestigeArray[playerLevel + 1].level,
                    maxCP: prestigeArray[playerLevel + 1].cpCap,
                    raidBoost: prestigeArray[playerLevel + 1].raidBonus,
                    dailyRaidCap: prestigeArray[playerLevel + 1].raidCap
                    
                },
            }
        );

    } catch(err){
        console.log(err);
    }
}