// plant array model
const mongoose = require('mongoose');

//create schema
const PlantArraySchema = mongoose.Schema({
    plantArray: {
        type: String,
        required: true
    }
});

//export
module.exports = mongoose.model('Garden', PlantArraySchema);