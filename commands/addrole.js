const playerModel = require("../models/playerSchema");
var unitSplash = require("../units/maids.json");
const { userMention, memberNicknameMention, channelMention, roleMention } = require('@discordjs/builders');
module.exports = {
    name: 'addrole',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "embeds",
    async execute(client, message,cmd,args,Discord){
        //var target = "618884909494304808";
        console.log(typeof message.author.id);
        var target = message.guild.members.cache.get('263762368650149888');
        console.log(target);
        //message.channel.send(`this is what we are getting for target: ${target}`);

        //var role = message.mentions.roles.first();
        var role = "909293553962844180";
        //console.log(role);
        //message.channel.send(`this is what we are getting for role: ${role}`);
        

        
        target.roles.add(role);
        
        message.channel.send(`${target} has been given the role ${roleMention(role)}`);
    }
}