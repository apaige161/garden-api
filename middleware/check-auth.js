//middleware to authicated using jwt

//do have token
//validate token

const jwt = require("jsonwebtoken");
const { error } = require("selenium-webdriver");


//sending middleware is just a function so export it as one
//gets executed on the incoming request
module.exports = (req, res, next) => {
    try {
        //get the token from headers
        //will return "bearer 23874oryfq(token)", ignore the bearer part
        
        const token = req.headers.authorization.split(" ")[1];

        //verify token
        //goal is to send data back to front end && be able to access decodedToken from routes/posts.js to get user Id
        const decodedToken = jwt.verify(token, "super_secret_password");
        
        //create new field
        req.userData = {email: decodedToken.email, userId: decodedToken.userId};

        //if not errors let execution continue
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Auth Failed, invalid bearer token"})
    }
    
};