import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SinglePlant } from '../models/single-plant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlantServerService {

  today = new Date();

  plants: Observable<SinglePlant[]>;

  //inject http 
  url = 'http://localhost:3000/api/gardens';

  //data to be posted
  postData = {
    owner: "",
    plant: "default",
    plantType: "",
    garden: "default",
    season: "",
    zone: "",
    perFoot: 0,
    growthModifier: 1,
    daysToHarvest: 0,
    datePlanted: this.today,
    dateToHarvest: null,
    daysLeftToHarvest: null,
    progressToHarvest: null,
    xGarden: 0,
    yGarden: 0,
    col: 0,
  }

  deleteData = {
    _id: "",
    owner: "",
    plant: "",
    plantType: "",
    season: "",
    zone: "",
    perFoot: 0,
    growthModifier: 1,
    daysToHarvest: 0,
    datePlanted: this.today,
    xGarden: 0,
    yGarden: 0,
    col: 0,
  }

  constructor(private http: HttpClient) {}

  //get all plants
  getPlants() {
    return this.http.get<SinglePlant[]>(this.url);
  }

  //get only signed in user's plants
  getMyPlants() {
    return this.http.get<SinglePlant[]>(this.url + "/onlyUserGarden");
  }

  

  /********************************************************************************************
  * 
  * save a new plant
  *  
  ********************************************************************************************/
  newPlant(
    owner: string,
    plantName: string, 
    plantType: string,
    gardenName: string, 
    plantingSeason: string, 
    plantZone: string,
    perFoot: number,
    growthModifier: number,
    daysToHarvest: number,
    datePlanted: any,
    dateToHarvest: Date,
    daysLeftToHarvest: number,
    progressToHarvest: number,
    xGarden: number,
    yGarden: number,
    col: number) {
      this.postData.owner = owner;
      this.postData.plant = plantName;
      this.postData.plantType = plantType;
      this.postData.garden = gardenName;
      this.postData.season = plantingSeason;
      this.postData.zone = plantZone;
      this.postData.perFoot = perFoot;
      this.postData.growthModifier = growthModifier;
      this.postData.daysToHarvest = daysToHarvest;
      this.postData.datePlanted = datePlanted;
      this.postData.dateToHarvest = dateToHarvest;
      this.postData.daysLeftToHarvest = daysLeftToHarvest;
      this.postData.progressToHarvest = progressToHarvest;
      this.postData.xGarden = xGarden;
      this.postData.yGarden = yGarden;
      this.postData.col = col;
      //return as a promise
      this.http.post(this.url, this.postData)
        .subscribe(data => {
        //console.log(data);
    })
  }

  /********************************************************************************************
  * 
  * save a new garden
  *  --TODO: integrate this way of sending to DB
  *  -change params
  * 
  ********************************************************************************************/
  newGarden(
    plantName: string, 
    plantType: string,
    gardenName: string, 
    plantingSeason: string, 
    plantZone: string,
    perFoot: number,
    daysToHarvest: number,
    xGarden: number,
    yGarden: number,
    col: number) {
      this.postData.plant = plantName;
      this.postData.plantType = plantType;
      this.postData.garden = gardenName;
      this.postData.season = plantingSeason;
      this.postData.zone = plantZone;
      this.postData.perFoot = perFoot;
      this.postData.daysToHarvest = daysToHarvest;
      this.postData.xGarden = xGarden;
      this.postData.yGarden = yGarden;
      this.postData.col = col;
      //return as a promise
      this.http.post(this.url, this.postData)
        .subscribe(data => {
        //console.log(data);
    })
  }

  /********************************************************************************************
  * 
  * Delete methods
  * 
  ********************************************************************************************/

  deleteOne(id: string) {
    return this.http.delete(this.url+'/'+id)
  }

  //delete all plants with a given name
  //must store each garden in an array to do this??
  deleteGarden(gardenName: string) {
    
      
  }

  /********************************************************************************************
  * 
  * Get single plant by Id
  * 
  ********************************************************************************************/

  //get one plant
  getOnePlant(id: string) {
    return this.http.get<{
      _id: number;
      plant: string,
      plantType: string,
      garden: string,
      season: string,
      zone: string,
      perFoot: number,
      growthModifier: number,
      daysToHarvest: number,
      datePlanted: Date,
      dateToHarvest: Date,
      daysLeftToHarvest: number,
      progressToHarvest: number,
    }>(this.url+'/'+id);
  }


  /********************************************************************************************
  * 
  * TODO:
  * Patch single plant by Id
  *   --get new date from component and send new garden plant with that new value to backend
  *   --create a new object with same same id to replace the item
  * 
  ********************************************************************************************/

  //get one plant date planted
  updateOnePlantPlanted( id: string, datePlanted: Date) {
  
    let postData: any;

    //create object to send
    postData = {
      id: id,
      datePlanted: datePlanted
      
    }

    //send to backend
    this.http.put(this.url + "/changeDatePlanted/" + id, postData).subscribe( result => {
      //console.log(result);
    })
  }

  //update plant name + type + season + perFoot + growthModifier + daysToHarvest + datePlanted
  updatePlant( 
    id: string, 
    plant: string, 
    plantType: string, 
    season: string, 
    perFoot: number,
    growthModifier: number,
    daysToHarvest: number,
    datePlanted: Date) {

      let postData: any;
      postData = {
        id: id,
        plant: plant,
        plantType: plantType,
        season: season,
        perFoot: perFoot,
        growthModifier: growthModifier,
        daysToHarvest: daysToHarvest,
        datePlanted: datePlanted,
      }

      console.log(postData.plant);

      //send to backend
      this.http.put(this.url + "/updatePlant/" + id, postData).subscribe( result => {
        //console.log(result);
    })

  }

  //update one plant -harvest date
  updateOnePlantHarvested( id: string,  dateToHarvest: Date ) {
  
    let postData: any;

    //create object to send
    postData = {
      id: id,
      dateToHarvest: dateToHarvest
      
    }

    //send to backend
    this.http.put(this.url + "/changeDateHarvested/" + id, postData).subscribe( result => {
      //console.log(result);
    })
  }

  //update one plant -growth modifier
  updateOnePlantGrowthModifier( id: string,  growthModifier: number ) {
  
    let postData: any;

    //create object to send
    postData = {
      id: id,
      growthModifier: growthModifier
      
    }

    //send to backend
    this.http.put(this.url + "/changeGrowthModifier/" + id, postData).subscribe( result => {
      //console.log(result);
    })
  }

}



