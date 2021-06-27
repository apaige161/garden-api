/**
 * 
 * Handle user related logic
 * 
 */

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


//sign up
exports.createUser = (req,res,next) => {
    //hash pasword
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User ({
            email: req.body.email,
            //encrypt password
            password: hash,
        });

    user.save()
        .then(result => {
            res.status(201).json({
                message: 'User created',
                result: result
            })
        }).catch(err => {
            //throw internal server error
            res.status(500).json({
                //error object
                message: "Invalid credentials, try a different email"
            });
        });
    });
};

exports.userLogin = (req, res, next) => {

    let fetchedUser;
    let userEmail;

    //find the user's email
    User.findOne({email: req.body.email})
    
    //fires when email is found
        .then(user => {

            if(!user) {
                //use the return to prevent a second return value
                return res.status(401).json({
                    message: "Authentication failed, invalid user"
                })
            }

            //testing
            userEmail = user.email;
            fetchedUser = user;

            //did find user, now compare password, returns a promise
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            //result == true if compare was a match
            if(!result) {
                //use the return to prevent a second return value
                return res.status(401).json({
                    message: "Authentication failed, password is invalid"
                })
            }

            //if email and password are valid create json web token
            //sign the payload and pass secret 'password' 
            //change this password later
            const token = jwt.sign(
                {email: fetchedUser.email, userId: fetchedUser._id}, 
                process.env.JWT_KEY, 
                { expiresIn: "1h" }); //expires in 1 hour

            //will return the created token
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                //return user id
                //decode on the backend to improve performance
                userId: fetchedUser._id,
                //return user email
                userEmail: fetchedUser.email,
            });

        })
        .catch(err => {
            return res.status(401).json({
                message: "Authentication failed"
            })
        });

}