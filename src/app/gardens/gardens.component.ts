
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

import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
//import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-gardens',
  templateUrl: './gardens.component.html',
  styleUrls: ['./gardens.component.css']
})
export class GardensComponent implements OnInit {


  constructor(private plantService: PlantServerService, private http: HttpClient) { }


  plants: SinglePlant[];

   readonly url = 'http://localhost:3000/api/gardens';

   /****************START sort and filter*******************/

    Garden = 'full garden';
    SearchGarden = '';
    gardenNames = [];
    singleGardenNames = [];

    SortByParam = 'garden';
    SortDirection = 'asc'

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

    /****************END sort and filter*******************/

   allPlantsinit() {
    this.plantService.getPlants()
      .subscribe(data => this.plants = data);
  }

  //TODO:
  deleteGarden() {
    
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

  //get each garden name
  
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

  //spinner logic
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 25; //out of 100
  diameter = 50;

  //TODO: get date planted

  //run for each loop over selected garden items to capture date planted

  //TODO: send updated values to DB or do this logic somewhere else
    //--only do this for the selected garden to improve performance
    //does not take long with a short number of gardens but will not scale
  getEachDatePlanted() {

    this.plants.forEach(plant => {

      let plantedOn: Date;
      let harvestIn: number;
      let harvestOnDate: Date;
      let daysLeft: number;

      const oneDay: number = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

      //parse JSON date into date -- JSON returns a string
      plantedOn = new Date( plant.datePlanted );
      harvestIn = plant.daysToHarvest;

      
      

      //plantedOn + harvestIn = harvestOnDate
      //add number of days to planting date
      harvestOnDate = new Date();
      //add days to harvest
      harvestOnDate.setDate(plantedOn.getDate() + harvestIn);

      //set the object potential harvest date
      plant.dateToHarvest = harvestOnDate;




      //calculate days left til harvest
      //days til harvest - may be null

      //execute this only if it has already been set
      //TODO: do this pattern above too
      if(plant.daysLeftToHarvest) {
        daysLeft = plant.daysLeftToHarvest;
      
        //execute this if the value has not been set yet
      } else {
        //calculate how many days are left until dateToHarvest

        daysLeft = Math.round( ( +plantedOn ) - ( +harvestOnDate ) / oneDay);
        //console.log(daysLeft + " --days left for-- " + plant.plant)
      }

      /***************************************
       * This is not the right calculation
       **************************************/
      //calculate % out of 100 based on how many days are left to harvest
      this.value = Math.round((harvestIn / daysLeft) * 10)
      console.log(this.value);

    });
  }


  //calculate how many days are left and return a whole number to pass to spinner
  


   

  /**************************************************************************************
  * 
  * END harvest progress spinner logic
  *  
  **************************************************************************************/




    ngOnInit() {

      this.allPlantsinit();
      
    }


  }
