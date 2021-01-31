const mongoose = require('mongoose');
const schema= mongoose.Schema;

const diceSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    range: {
        type: Number,
        required: true
    },
    result: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Dice = mongoose.model('Dice', diceSchema);
module.exports = Dice; 