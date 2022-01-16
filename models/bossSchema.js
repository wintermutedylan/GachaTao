const mongoose = require('mongoose');

const bossSchema = new mongoose.Schema({
    bossName: { type: String, require: true, unique: true},
    totalHP: { type: Number, default: 0},
    currentHP: { type: Number, default: 0},
    bossIcon: { type: String}
    

})

const model = mongoose.model('BossModels', bossSchema);

module.exports = model;