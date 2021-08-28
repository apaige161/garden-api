import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Harvest } from '../models/harvest';
import { HarvestService } from '../services/harvest.service';

@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.css']
})
export class HarvestComponent implements OnInit {

  /****************************************************************************************
   * 
   * --High priority--
   * -TODO: add these arrays together for a new object -or add them back into another Harvest object and add 
   * -TODO: create new model to hold optional notes string value
   * -TODO: add to backend to save
   * 
   * blocked by ^^
   * TODO: be able to sort by plantType
   * TODO: add section to leave notes for the following year
   *  -ability to leave notes from the harvested page
   * TODO: organize by plant type
   * 
   * 
   * --Low priority--
   * Fetch harvested plants from database for user only (1/2 DONE)
   *  -DONE: filter on client side (only user data) for now
   *  -TODO: filter on backend
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   ****************************************************************************************/

  harvestSubscription: Subscription;
  harvest = [];

  totalQuality: number = 0;
  averageQuality:number = 0;

  userEmail: string;

  getCurrentUser() {
    return this.userEmail = localStorage.getItem("userEmail");
  }


  constructor(private plantHarvest: HarvestService) {
    //get user
    this.getCurrentUser();
  }

  ngOnInit(): void {

    this.harvestSubscription = this.plantHarvest.getHarvest()
      .subscribe(data => {
        data.forEach(harvestedPlant => {
          //user filter
          if(harvestedPlant.owner === this.userEmail) {
            //push each user plant to harvest[]
            this.harvest.push(harvestedPlant)
          }

          /*
          this.harvest.forEach( item => {
            //console.log(item);
          })
          */
        })

      //run calculation methods on init
      this.averageRating();
      this.totalPerPlantName();

      });

  }

  /******************************************************************************
   * 
   * Rating system for all harvests
   * 
   ******************************************************************************/
  //total rating
  averageRating(){
    let numOfPlants:number = 0;
    this.harvest.forEach(plant => {
      this.totalQuality += plant.quality;
      numOfPlants++
    });
    this.averageQuality = this.totalQuality / numOfPlants;
  }

  
  /******************************************************************************
   * 
   * Totals
   * 
   *  -if plant name exists add perfoot to current value
   *  
   *    
   * 
   ******************************************************************************/

  nameArr = []; //[plant name]
  totalsArr = []; //[plant number harvested]
  qualityArr = []; //[average quality]
  dateArr = []; //[dates harvested]
  idArr = []; //[id]
  count = 0
  sum = 0;

  //occurenceInedexesArr = []
  //add indexes of each occurence here, then reset occurences to empty arr
  

  //will only work for function below
  findOccurences(arr, value) {
    arr.forEach(element => {
      //count number of times a given value is in an array
      if(element.plant == value) {
        this.count++
      }
    });
  }

  //find sum of quality for a plant
  findSum(arr, plantName) {
    arr.forEach(element => {
      //count number of times a given value is in an array
      if(element.plant == plantName) {
        this.sum += element.quality
      }
    });
    console.log("The sum of quality for " + plantName + " is " + this.sum);
  }

  
  totalPerPlantName(){
    
    //loop through each plant
    this.harvest.forEach(plant => {

      //get each plant harvested, once
      if(this.nameArr.includes(plant.plant)) {
        //add quantity to array in correct index
        let index = this.nameArr.indexOf(plant.plant);
        
        this.totalsArr[index] += plant.quantity;

        //find how many times this index has the same plant value
        this.findOccurences(this.harvest, plant.plant) 
        console.log(plant.plant + " has " + this.count + " number of occurences");

        //get average
        this.findSum(this.harvest, plant.plant);
        let avg = Math.round(this.sum / this.count);
        //set average
        this.qualityArr[index] = avg;

        //reset counter and sum
        this.count = 0;
        this.sum = 0;
      
        
      } else { //no previous value found with the name being looped over

        //push values - should have same indexes
        this.nameArr.push(plant.plant);
        this.totalsArr.push(plant.quantity);
        this.qualityArr.push(plant.quality);
        this.dateArr.push(plant.date);
        this.idArr.push(plant._id);
      }
    })
  }


  //determine what stars are solid/empty
  returnStar(i: number, quality: number) {
    if(quality >= i + 1) {
      return 'star'
    } else {
      return 'star_border'
    }
  }

  /*********************************************************************************
   * 
   * Operations
   * 
   **********************************************************************************/

  deleteById(id: string) {
    console.log("attempt delete " + id +" from harvest component...")
    this.plantHarvest.deleteOne(id).subscribe();
  }



  /*********************************************************************************
   * 
   * Adding notes
   *  -Do this after new objects are created
   *  -TODO: create new model to hold optional notes string value
   *  -TODO: be able to add notes to the plants harvested
   * 
   **********************************************************************************/

  value = 'Clear me';







}
