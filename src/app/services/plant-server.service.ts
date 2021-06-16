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

  

  /**
   * 
   * save a new plant
   * 
   */
  newPlant(
    owner: string,
    plantName: string, 
    gardenName: string, 
    plantingSeason: string, 
    plantZone: string,
    perFoot: number,
    daysToHarvest: number,
    datePlanted: any,
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
      this.postData.xGarden = xGarden;
      this.postData.yGarden = yGarden;
      this.postData.col = col;
      //return as a promise
      this.http.post(this.url, this.postData)
        .subscribe(data => {
        console.log(data);
    })
  }

  /**
   * 
   * save a new garden
   * 
   */
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

  deleteOne(id: string) {
    return this.http.delete(this.url+'/'+id)
  }

  //delete all plants with a given name
  //must store each garden in an array to do this
  deleteGarden(gardenName: string) {
    
      
  }

}



