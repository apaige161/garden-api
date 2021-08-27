import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
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
   * TODO: organize data in cards - space for notes
   * TODO: Only display totals with average rating next to them, not each harvested square
   * TODO: be able to sort by year, plantType
   * TODO: add section to leave notes for the following year
   *  -ability to leave notes from the harvested page
   * TODO: organize by plant type
   * 
   * 
   * Fetch harvested plants from database for user only (1/2 DONE)
   *  -DONE: filter on client side (only user data) for now
   *  -TODO: filter on backend
   * 
   * 
   * 
   ****************************************************************************************/

  harvestSubscription: Subscription;
  harvest: Harvest[] = [];

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
   * Rating system
   * 
   *  TODO: calculate avg rating per plant name, display within the same card
   *  TODO: run for loop to reduce html on displaying star rating
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

  

  //displayArr: Harvest[] = []
  nameArr = []; //[plant name]
  totalsArr = []; //[plant number harvested]
  qualityArr = [];

  tempArr = [];

  plantTotals() {
    for(let i = 0; i < this.harvest.length; i++) {
      for(let x = 1; x < this.harvest.length; x++) {
        if(this.harvest[i].plant == this.harvest[x].plant) {
          //find index and add quantity
          let newIndex = this.harvest.indexOf(this.harvest[i]);
          this.harvest[newIndex].quantity += this.harvest[i].quantity;
          console.log(this.harvest[i].plant + " was already in the array, " + this.harvest[i].quantity + " Is the new value")
        } else {
          //push to arr
          this.tempArr.push(this.harvest[i]);
        }
      }
    }
    console.log(this.tempArr);
  }



  /******************************************************************************
   * 
   * Totals
   * 
   *  -if plant name exists add perfoot to current value
   *  -TODO: get the average quality
   * 
   ******************************************************************************/
  count = 0
  

  //will only work for function below
  findOccurences(arr, value) {
    arr.forEach(element => {
      if(element.plant == value) {
        this.count++
      }
    });
  }

  

  totalPerPlantName(){
    
    //loop through each plant
    this.harvest.forEach(plant => {
      //get each plant harvested, once
      if(this.nameArr.includes(plant.plant)) {
        //add quantity to array in correct index
        let index = this.nameArr.indexOf(plant.plant);
        
        this.totalsArr[index] += plant.quantity;

        //TODO: get the average quality
        //find how many times this index has the same plant value
        this.findOccurences(this.harvest, plant.plant) 
        console.log(plant.plant + " has " + this.count + " number of occurences");
        this.qualityArr[index] = plant.quantity;


        //reset counter
        this.count = 0;
        
      } else {

        //push values
        this.nameArr.push(plant.plant);
        this.totalsArr.push(plant.quantity);
        this.qualityArr.push(plant.quality);
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
    //console.log("attempt delete " + id +" from harvest component...")
    this.plantHarvest.deleteOne(id).subscribe();
  }











}
