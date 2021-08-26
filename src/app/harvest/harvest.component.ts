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

  nameArr = []; //[plant name]
  totalsArr = []; //[plant number harvested]
  

  /******************************************************************************
   * 
   * Totals
   * 
   ******************************************************************************/

  //get total number of plants per plant name
  totalPerPlantName(){
    this.harvest.forEach(plant => {
      //get each plant harvested, once
      if(this.nameArr.includes(plant.plant)) {
        //add quantity to array in correct index
        let index = this.nameArr.indexOf(plant.plant);
        //console.log(this.totalsArr[index]);
        this.totalsArr[index] += plant.quantity;
        //console.log("this is the value plus new value:" + this.totalsArr[index]);
      } else {
        this.nameArr.push(plant.plant);
        //console.log("adding first quantity to array");
        this.totalsArr.push(plant.quantity);        
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
