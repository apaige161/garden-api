//single plant model
//const { stringify } = require('@angular/compiler/src/util');
const mongoose = require('mongoose');

//hold the individual plant object
//child schema
const PlantSchema = mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    plant: {
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

//hold the entire user garden data
const UserGardenSchema = mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    gardenName: {
        type: String,
        required: true,
    },
    plants: [ PlantSchema ]
})

//export
module.exports = mongoose.model('Plant', PlantSchema);
module.exports = mongoose.model('UserGarden', UserGardenSchema);
