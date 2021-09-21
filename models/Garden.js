//single plant model
const mongoose = require('mongoose');

//hold the individual plant object
const GardenSchema = mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    plant: {
        type: String,
        required: true,
    },
    plantType: {
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
    multiHarvest: {
        type: Boolean,
        required: true,
    },
    growthModifier: {
        type: Number,
        required: true,
    },
    daysToHarvest: {
        type: Number,
        required: true,
    },
    datePlanted: {
        type: Date,
        required: true,
    },
    dateToHarvest: {
        type: Date,
        required: true,
    },
    daysLeftToHarvest: {
        type: Number,
        required: false,
    },
    progressToHarvest: {
        type: Number,
        required: false,
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
