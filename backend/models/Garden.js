//single plant model
const mongoose = require('mongoose');

//create schema
const GardenSchema = mongoose.Schema({
    plant: {
        type: String,
        required: true,
    },
    garden: {
        type: String,
        required: true,
    },
    season: {
        type: String,
        required: true,
    },
    zone: {
        type: String,
        required: true,
    },
    perFoot: {
        type: Number,
        required: true,
    },
    daysToHarvest: {
        type: Number,
        required: true,
    },
    xGarden: {
        type: Number,
        required: true,
    },
    yGarden: {
        type: Number,
        required: true,
    },
    col: {
        type: Number,
        required: true,
    }
});

//export
module.exports = mongoose.model('Garden', GardenSchema);
