const mongoose = require('mongoose');
const schema= mongoose.Schema;

const espSchema = new mongoose.Schema({
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const ESP = mongoose.model('esp', espSchema);
module.exports = ESP; 