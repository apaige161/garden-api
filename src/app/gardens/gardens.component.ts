
/*******************************************************************************************
 * 
 * View gardens
 *  -right now can see all gardens created by any user
 *  -need to filter, only show current user's gardens
 * 
 *******************************************************************************************/



import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PlantServerService } from 'src/app/services/plant-server.service';
import { SinglePlant } from 'src/app/models/single-plant';

import { addDays, differenceInDays, startOfDay  } from 'date-fns'

import { MatDialog } from '@angular/material/dialog';

import { MoreInfoComponent } from '../more-info/more-info.component';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-gardens',
  templateUrl: './gardens.component.html',
  styleUrls: ['./gardens.component.css']
})
export class GardensComponent implements OnInit {


  //holds all plants
  plants: SinglePlant[] = [];

  userEmail: string;

  SearchGarden = '';
  gardenNames = [];
  singleGardenNames = [];
  Garden = '';

  refreshPlants = new BehaviorSubject<boolean>(true);
  
  getCurrentUser() {
    return this.userEmail = localStorage.getItem("userEmail");
  }

  constructor(private plantService: PlantServerService, private http: HttpClient, private matDialog: MatDialog) { 

    //get user
    this.getCurrentUser();

  }


  

   readonly url = 'http://localhost:3000/api/gardens';

  /*************************************************************************************************
   * 
  * START sort and filter
  * 
  **************************************************************************************************/

    
    

    SortByParam = 'garden';
    SortDirection = 'asc'

    today: Date = new Date();
    oneDay: number = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    //filter button logic
    onGardenFilter() {
      
      this.SearchGarden = this.Garden;

      

    }
    
    onGardenFilterClear() {
      this.SearchGarden = '';
      this.Garden = '';
    }

    //sort direction toggle
    onSortDirection() {
      if (this.SortDirection === 'desc') {
        this.SortDirection = 'asc';
      } else {
        this.SortDirection = 'desc';
      }
    }

  /*************************************************************************************************************************
  * 
  * Get all plants --for current user
  *   -set data
  * 
  *   --currently gets all plant data and filters on the front end, TODO: filter on server side
  * 
  **************************************************************************************************************************/

  

   allPlantsinit() {
    this.plantService.getPlants()
      .subscribe(data =>  {

        //get only user data, not all data
        data.forEach(plant => {
          if(plant.owner === this.userEmail) {
            //console.log(plant);
            this.plants.push(plant);
            //console.log(this.plants);
          }
        })

        //get date for plants in array
        this.getEachDatePlanted(this.plants);

      })
  }


  /*************************************************************************************************************************
  * 
  * Delete plants logic
  * 
  **************************************************************************************************************************/

  deleteGarden(gardenToDelete) {

    //loop over each plant and if the plant.garden == plant.gardenTodelete then delete
    this.plants.forEach(plant => {
      if(plant.garden == gardenToDelete) {
        return this.http.delete(this.url+'/'+plant._id).subscribe(res => {

        })
      }
    })
    //refresh list
    this.allPlantsinit();
  }

  deletePlant(id:string) {
    this.plantService.deleteOne(id).subscribe( res => {
      //refresh list
      this.allPlantsinit();
    })
  }

  deleteAllPlants(){

    console.log("delete all attempt start");

    //loop over each id and send the request
    this.plants.forEach(data => {
      return this.http.delete(this.url+'/'+data._id).subscribe(res => {
        console.log(data._id+" deleted")
      })
    })
    //refresh list
    this.allPlantsinit();
  }

  //get each garden name for current user
  //leave this here!
  getEachGardenNameOnce(){

    //push all garden names to array
    this.plants.forEach(item => {

      this.gardenNames.push(item.garden)

    });
    
  }
  

  //remove duplicates
  removeDuplicates(arr){

    //convert to a set which only allows unique values
    const uniqueSet = new Set(arr);

    //convert back to an array
    this.singleGardenNames = [...uniqueSet];

  }

  /**************************************************************************************
  * 
  * harvest progress logic
  *  
  **************************************************************************************/

  //run for each loop over selected garden items to get date data

  getEachDatePlanted(plantArr) {

    const today: Date = new Date();

    plantArr.forEach(plant => {

      //parse JSON date into date -- JSON returns a string
      plant.datePlanted = new Date(plant.datePlanted);
      plant.datePlanted = startOfDay(plant.datePlanted);

      //add number of days to planting date, factor in growth conditions
      plant.daysToHarvest = ( plant.daysToHarvest / plant.growthModifier  )
      plant.dateToHarvest = new Date();
      plant.dateToHarvest = startOfDay(plant.dateToHarvest);
      plant.dateToHarvest = addDays(plant.datePlanted, plant.daysToHarvest);
      plant.dateToHarvest = addDays(plant.dateToHarvest, 1);

      //calculate how many days are left until dateToHarvest
      //how many days are between today and expected harvest date
      plant.daysLeftToHarvest = differenceInDays(plant.dateToHarvest.getTime(), today.getTime())

      //calculate how many days are left and return a whole number to pass to spinner
      //calculate % out of 100 based on how many days are left to harvest
      plant.progressToHarvest = Math.floor(( 1 - (plant.daysLeftToHarvest / plant.daysToHarvest)) * 100);

      if(plant.daysLeftToHarvest <= 0) {
        plant.progressToHarvest = 100;
        plant.dateToHarvest = today;
        plant.daysLeftToHarvest = 0;
      }

      if(plant.plant == "empty") {
        plant.progressToHarvest = 0;
        plant.dateToHarvest = today;
        plant.daysLeftToHarvest = 0;
      }

    });
  }


  //progress bar
  color = 'accent';


  //change progress bar color

  

  
  /*******************************************************************************************
  * 
  * Dialog logic
  * 
  *******************************************************************************************/

  //get plant data into here
  //pass ID as a param??
  openMoreInfo(plantId: string) {
    this.matDialog.open(MoreInfoComponent, {
      data: {
        _id: plantId
      },
      width: "500px",
      height: "700px",
      disableClose: true
    });
    
  }

  



  /*******************************************************************************************
  * 
  * Lifecycle hooks
  * 
  *******************************************************************************************/


  ngOnInit() {

    //get user's gardens
    this.allPlantsinit();

  }


}
