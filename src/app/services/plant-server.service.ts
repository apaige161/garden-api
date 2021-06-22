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
    garden: "default",
    season: "",
    zone: "",
    perFoot: 0,
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
    season: "",
    zone: "",
    perFoot: 0,
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
    gardenName: string, 
    plantingSeason: string, 
    plantZone: string,
    perFoot: number,
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
      this.postData.garden = gardenName;
      this.postData.season = plantingSeason;
      this.postData.zone = plantZone;
      this.postData.perFoot = perFoot;
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
        console.log(data);
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
    gardenName: string, 
    plantingSeason: string, 
    plantZone: string,
    perFoot: number,
    daysToHarvest: number,
    xGarden: number,
    yGarden: number,
    col: number) {
      this.postData.plant = plantName;
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
        console.log(data);
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
      garden: string,
      season: string,
      zone: string,
      perFoot: number,
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

  //get one plant
  updateOnePlant( id: string, datePlanted: Date) {
  
    let postData: any;

    //create object to send
    postData = {
      id: id,
      datePlanted: datePlanted,
    }

    //send to backend
    this.http.put(this.url + "/" + id, postData).subscribe( result => {
      console.log(result);
    })
  }

}



