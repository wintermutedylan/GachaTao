const mongoose = require('mongoose'); 
const playerSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    coins: { type: Number, default: 0},
    raidTickets: { type: Number, default: 3},
    maids: { type: Array, default: []},
    dailyReset: { type: Boolean, default: false},
    starterSelected: {type: Boolean, default: false},
    totalCP: { type: Number, default: 0},
    urPity: { type: Number, default: 0},
    lrPity: { type: Number, default: 0},
    position: { type: Number},
    raidPosition: { type: Number},
    stealCD: { type: Number},
    raidCD: { type: Number},
    starterName: { type: String},
    raidsWon: { type: Number, default: 0},
    weeklyRaidsWon: { type: Number, default: 0},
    dailyRaidsPlayed: { type: Number, default: 0},
    questsComplete: { type: Array, default: []},
    items: { type: Array, default: []},
    megaRaidDamageDone: { type: Number, default: 0},
    rollCD: { type: Number},
    prestigeHelpStatus: { type: Boolean, default: false},
    milimsOwned: { type: Array, default: []},
    prestigeLevel: { type: Number, default: 0},
    maxCP: { type: Number, default: 0},
    raidBoost: { type: Number, default: 0},
    dailyRaidCap: { type: Number, default: 0}


})

const model = mongoose.model('PlayerModels', playerSchema);

module.exports = model;