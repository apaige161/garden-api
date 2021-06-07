
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
    console.log('removed duplicate garden names')
  }


    ngOnInit() {

      this.allPlantsinit();
      
      
    }


  }
