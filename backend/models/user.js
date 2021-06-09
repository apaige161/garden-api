//user model

const mongoose = require('mongoose');

//extra functionality
//will add an extra hook that will check data before saving to the DB
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
});

//will throw an error if user trys to use an email that is already in use
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);