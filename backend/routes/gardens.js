
/**************************************************************************************************************
 * 
 * file holds gardens routes
 * http://localhost:3000/api/gardens
 * 
 ***************************************************************************************************************/

const express = require('express');
const router = express.Router();
//import model
const Garden = require('../models/Garden');

/*************************************************************************************************************
 * 
 * get all gardens 
 *  
****************************************************************************************************************/
router.get('/', async (req,res) => {
    try{

        //var to store all garden data
        const gardens = await Garden.find();

        //return response
        res.json(gardens);

    } catch(err) {
        res.json({message: err});
    }
});

/*********************************************************************************************************************
 * 
 * only fetch user's gardens
 * --currently does not work properly
 * 
 **********************************************************************************************************************/
router.get('/onlyUserGarden', async (req,res) => {
    try{

        //var to store all garden data
        const gardens = await Garden.find({owner: req.params.owner});

        //return response
        res.json(gardens);

    } catch(err) {
        res.json({message: err});
    }
});


/**********************************************************************************************************************
 * 
 *  get specific plant by ID
 * 
 **********************************************************************************************************************/
router.get('/:plantId', async (req, res) => {
    try{
        //use model and find by ID
        const post = await Garden.findById(req.params.plantId);
        //give back the specific post
        res.json(post);
    } catch(err) {
        res.json({message: err});
    }
})


/***********************************************************************************************************************
 *  
 * delete specific plant by ID
 * 
 ***********************************************************************************************************************/
router.delete('/:plantId', async (req, res) => {
    try{
        //use model and remove by ID targeting the _id param
        const removedPlant = await Garden.deleteOne({_id: req.params.plantId});
        res.json(removedPlant);
    } catch(err) {
        res.json({message: err});
    }
})

/*************************************************************************************************************************
 * 
 * update date planted specific plant by ID
 * 
 *************************************************************************************************************************/
router.put('/:plantId', async (req, res) => {
    try{
        //use model and update by ID targeting the _id param
        //the first param of updateOne is to find the object, 
        //second is what to change it to
        const updatedPlant = await Garden.updateOne(
            {_id: req.params.plantId}, 
            {$set: {datePlanted: req.body.datePlanted}});
        res.json(updatedPlant);
    } catch(err) {
        res.json({message: err});
    }
})

/***************************************************************************************************************************
 * 
 * submit plant
 * 
 ***************************************************************************************************************************/
router.post('/', async (req,res) => {

    //get plant data
    const garden = new Garden({

        owner: req.body.owner,
        plant: req.body.plant,
        garden: req.body.garden,
        season: req.body.season,
        zone: req.body.zone,
        perFoot : req.body.perFoot,
        daysToHarvest : req.body.daysToHarvest,
        datePlanted: req.body.datePlanted,
        dateToHarvest: req.body.dateToHarvest,
        daysLeftToHarvest: req.body.daysLeftToHarvest,
        progressToHarvest: req.body.progressToHarvest,
        xGarden: req.body.xGarden,
        yGarden: req.body.yGarden,
        col: req.body.col,


    });

    //save to database
    try{
        const savedGarden = await garden.save();
        res.json(savedGarden);
    } catch(err) {
        res.json({message: err});
    }
});

//export routes
module.exports = router;