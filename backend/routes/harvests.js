

const express = require('express');
const router = express.Router();

const Harvest = require('../models/Harvest');


/*************************************************************************************************************
 * 
 * GET all gardens 
 *  -TODO: only return gardens for current user
 *  
****************************************************************************************************************/
router.get('/', async (req,res) => {
    try{

        //var to store all harvest data
        const harvest = await Harvest.find();

        //return response
        res.json(harvest);

    } catch(err) {
        res.json({message: err});
    }
});


/***************************************************************************************************************************
 * 
 * POST plant
 * 
 ***************************************************************************************************************************/
 router.post('/', async (req,res) => {

    //get plant data
    const harvest = new Harvest({

        owner: req.body.owner,
        date: req.body.date,
        plant: req.body.plant,
        quality: req.body.quality,
        quantity: req.body.quantity,
        garden: req.body.garden,
        plantType : req.body.plantType,

    });

    //save to database
    try{
        const savedHarvest = await harvest.save();
        res.json(savedHarvest);
    } catch(err) {
        res.json({message: err});
    }
});







//export routes
module.exports = router;