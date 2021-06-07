const express = require("express");

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/img-file');

const PostController = require("../controllers/posts")


const router = express.Router();

/**
 * some routes protected
 * -post, put, delete
 */



//create post
//localhost:3000/api/posts
//will try to extract a single image file on poast
router.post(
        "", //path
        checkAuth, //protect route, only continue if logged in success
        extractFile, //image upload middleware
        PostController.createPost //route logic
    );

//update post by id
//localhost:3000/api/posts/:id
//only the user that created the post can edit it
router.put(
    "/:id", 
    checkAuth, //protect route, only continue if logged in success
    extractFile, //image upload middleware
    PostController.updatePost //route logic
) 

//get all posts
//localhost:3000/api/posts
router.get(
    '', 
    PostController.getAllPosts //route logic
);

//get single post
router.get(
    "/:id", 
    PostController.getPostById //route logic
);

//delete single post by id
//localhost:3000/api/posts/<id>
//only the user that created the post can delete it
router.delete(
    "/:id", //path
    checkAuth, //protect route, only continue if logged in success
    PostController.deletePost //route logic
);

module.exports = router;