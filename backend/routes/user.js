

const express = require("express");

//import user logic
const UserController = require("../controllers/user");

const router = express.Router();

/**
 * 
 * Route logic stored in UserController
 * 
 */

//  api/user/signup
//create new user and store in DB
router.post("/signup", UserController.createUser);


//  api/user/login
//generate web token
router.post("/login", UserController.userLogin);

module.exports = router;