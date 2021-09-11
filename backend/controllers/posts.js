
const Post = require('../models/post');

exports.createPost = (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    //populate data to fill post model
    const post = new Post({
        title: req.body.title,
        ingredients: req.body.ingredients,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        //extract user Id from the token in check auth
        //comes from new req.userData field in check-auth middleware
        creator: req.userData.userId,
        creatorEmail: req.userData.email
    });
    //save post to DB
    post.save().then(createdPost => {
        //everything returned OK, new resource was created
        res.status(201).json({
            message: 'Post added successfully',
            post: {
                //copy all properties of object, then override id prop
                ...createdPost,
                id: createdPost._id,
            }
        });

    //handle add post errors
    }).catch(error => {
        res.status(500).json({ message: "Could not create post" })
    });
};

exports.updatePost = (req, res, next) => {
    //check for file present
    let imagePath = req.body.imagePath; //default value
    if(req.file) {
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }

    //create local post object
    const post = new Post ({
        _id: req.body.id,
        title: req.body.title,
        ingredients: req.body.ingredients,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId,
        
    });
    

    //targets by id and sends the request to replace the current object with the new post object
    //add an additional check to confirm correct user by Id
    //only update if post and user id are correct
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
        //error message
        if(!res.status(200)) {
        console.log('post update one problem');
        }

        //if something was modified on the database
        if (result.n > 0) {
            res.status(200).json({message: 'Update Successfull'});
        } else {
            //not autorized
            res.status(401).json({message: 'Update Not Successfull, User Not Authorized!'});
        }
        
    }). catch(error => {
        res.status(500).json({ message: "Could not update post" });
    });
};

exports.getAllPosts = (req, res, next) => {

    //pagination
    //retrieve data from querry object

    //get data as number
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;

    //limit number of posts by front end pagination controls
    if(pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }

    //find all posts then,
    //find number of posts in DB
    postQuery.then(documents => {
        fetchedPosts = documents;
        return Post.countDocuments();
    })
    //send response
    .then(count => {
        res.status(200).json({
            message: "Posts fetched successfully",
            posts: fetchedPosts,
            //total number of posts
            maxPosts: count
        })
    //catch technical issues
    }).catch(error => {
        res.status(500).json({ message: "Cannot fetch posts" });
    });
}

exports.getPostById = (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        //if a post is found
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Cannot fetch post"
        });
    });
}

exports.deletePost = (req,res, next) => {
    //only delete if post is owned by user
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId}).then(result => {
        //if something was deleted on the database
        console.log(result);
        if (result.n > 0) {
            res.status(200).json({message: 'Deleted Post Successfull'});
        } else {
            //not autorized
            res.status(401).json({message: 'Not Authorized to delete this post, respect my authoriti'});
        }
    });

}