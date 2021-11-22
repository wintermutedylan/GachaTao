const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    coins: { type: Number, default: 0},
    maids: { type: Array, default: 0},
    dailyRolls: { type: Number, default: 5},
    dailyReset: { type: Boolean, default: false},
    starterSelected: {type: Boolean, default: false},
    totalCP: { type: Number, default: 0}
})

const model = mongoose.model('PlayerModels', playerSchema);

module.exports = model;