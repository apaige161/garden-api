//post model

// const { stringify } = require('@angular/compiler/src/util');
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },

    //who created the post

    //id
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        //which model the id refers to
        //id belonging to a user
        ref: "User",
        required: true
    },
    creatorEmail: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Post', postSchema);
