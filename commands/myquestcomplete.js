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

    }
}