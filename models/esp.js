const mongoose = require('mongoose');
const schema= mongoose.Schema;

const espSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
}, {timestamps: true});

const ESP = mongoose.model('esp', espSchema);
module.exports = ESP; 