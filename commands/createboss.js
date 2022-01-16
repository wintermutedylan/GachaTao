var maids = require("../units/maids.json");
const bossModel = require("../models/bossSchema");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
const progressbar = require('string-progressbar');
module.exports = {
    name: 'createboss',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "resets the weekly raids won",
    async execute(client, message,cmd,args,Discord){
        //goes name totalhp icon
        
        let icon = args.pop();
        let total = args.pop();
        let current = total;
        let name = args.join(" ");
        //var line = '🟥'
        //var slider = '🟩';
        
        
            
            try {
                
                
                    let boss = await bossModel.create({
                            bossName: name,
                            totalHP: total,
                            currentHP: current,
                            bossIcon: icon
                        
                    });
                    boss.save();
                
            } catch(err){
                console.log(err);
            }

        message.channel.send(`Created ${name} boss with ${new Intl.NumberFormat().format(total)} HP`)
        
        
        
        //message.channel.send(`${progressbar.filledBar(total, current, 10, line, slider)[0]} HP: ${new Intl.NumberFormat().format(current)}/${new Intl.NumberFormat().format(total)}`);

    }
}