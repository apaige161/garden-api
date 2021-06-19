
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
import { MatDialog } from '@angular/material/dialog';
import { EditPlantComponent } from '../edit-plant/edit-plant.component';
import { MoreInfoComponent } from '../more-info/more-info.component';


@Component({
  selector: 'app-gardens',
  templateUrl: './gardens.component.html',
  styleUrls: ['./gardens.component.css']
})
export class GardensComponent implements OnInit {


  constructor(private plantService: PlantServerService, private http: HttpClient, private matDialog: MatDialog) { }


  plants: SinglePlant[];

   readonly url = 'http://localhost:3000/api/gardens';

  /*************************************************************************************************
   * 
  * START sort and filter
  * 
  **************************************************************************************************/

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

    /***************************************************************************************************
    * 
    * Get mall plants
    * 
    *****************************************************************************************************/

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


  

  //spinner logic
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value: number = 0; //out of 100
  diameter = 50;


  
  /*******************************************************************************************
  * 
  * Dialog logic
  * 
  *******************************************************************************************/

  //get plant data into here
  //pass ID as a param??
  openMoreInfo() {
    let dialogRef = this.matDialog.open(MoreInfoComponent, {
      data: {
        number: 10
      },
      width: "500px",
      height: "500px",
      disableClose: true
    });

    /*
    //opens an alert after closed
    dialogRef.afterClosed().subscribe(
      result => {
        alert(result.number);
      }
    );
    */
  }

  //get plant data into here
  openEditPlant() {
    let dialogRef = this.matDialog.open(EditPlantComponent, {
      data: {
        number: 10
      },
      width: "500px",
      height: "500px",
      disableClose: true
    });
  }





    ngOnInit() {

      this.allPlantsinit();
      
    }


  }
