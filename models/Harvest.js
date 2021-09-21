//Harvest plant model

const mongoose = require('mongoose');

const HarvestSchema = mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    plant: {
        type: String,
        required: true
    },
    quality: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    garden: {
        type: String,
        required: true
    },
    plantType: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    transformed: {
        type: Boolean,
        required: true
    }
});


//export
module.exports = mongoose.model('Harvest', HarvestSchema);