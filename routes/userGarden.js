
/***
 * 
 * Currently does not work properly,
 *  research mongo subdocuments and how to set them
 * 
 * 
 * file holds userGarden routes
 */

 const express = require('express');
 const router = express.Router();
 //import model
 const UserGarden = require('../models/userGarden');
 
/** get userGardens **/
 router.get('/', (req,res) => {
     try{
 
         //var to store all garden data
         const gardens = UserGardens.find();
 
         //return response
         res.json(gardens);
 
     } catch(err) {
         res.json({message: err});
     }
 });
 
 
 /** get specific garden by ID **/
 router.get('/:postId', (req, res) => {
     try{
         //use model and find by ID
         const garden = UserGarden.findById(req.params.postId);
         //give back the specific post
         res.json(garden);
     } catch(err) {
         res.json({message: err});
     }
 })
 
 
 /** delete specific plant by ID **/
 router.delete('/:postId', (req, res) => {
     try{
         //use model and remove by ID targeting the _id param
         const removedGarden = UserGarden.deleteOne({_id: req.params.postId});
         res.json(removedGarden);
     } catch(err) {
         res.json({message: err});
     }
 })
 
 /** update specific plant by ID **/
 //needs work
 router.patch('/:postId', (req, res) => {
     try{
         //use model and update by ID targeting the _id param
         //the first param of updateOne is to find the object, 
         //second is what to change it to
         const updatedGarden = UserGarden.updateOne({_id: req.params.postId}, {$set: {plant: req.body.plant}});
         res.json(updatedGarden);
     } catch(err) {
         res.json({message: err});
     }
 })
 
 /** submit garden **/
 router.post('/', (req,res) => {

    //create new garden
    const newGarden = new UserGarden({owner: 'Alex', gardenName: "array garden"});

    newGarden.plants = [{
        plant: "star",
        season: "spring",
        zone: "5b",
        perFoot : 1,
        daysToHarvest : 25,
        xGarden: 1,
        yGarden: 1,
        col: 1,
    }]
        
    console.log(newGarden);

     //save to database
     try{
         const savedUserGarden = newGarden.save();
         res.json(savedUserGarden);
         console.log("should have saved garden");
     } catch(err) {
         res.json({message: err});
     }
 });
 
 //export routes
 module.exports = router;