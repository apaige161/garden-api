import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SinglePlant } from '../models/single-plant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlantServerService {

  plants: Observable<SinglePlant[]>;

  //inject http 
  url = 'http://localhost:3000/api/gardens';
  //data to be posted
  postData = {
    plant: "default",
    garden: "default",
    season: "",
    zone: "",
    perFoot: 0,
    xGarden: 0,
    yGarden: 0,
    col: 0,
  }

  deleteData = {
    _id: "",
    plant: "",
    season: "",
    zone: "",
    perFoot: 0,
    xGarden: 0,
    yGarden: 0,
    col: 0,
  }

  constructor(private http: HttpClient) {}

  //get all plants
  getPlants() {
    return this.http.get<SinglePlant[]>(this.url);
  }


  /**
   * 
   * create a new plant
   * 
   */
  newPlant(
    plantName: string, 
    gardenName: string, 
    plantingSeason: string, 
    plantZone: string,
    perFoot: number,
    xGarden: number,
    yGarden: number,
    col: number) {
    this.postData.plant = plantName;
    this.postData.garden = gardenName;
    this.postData.season = plantingSeason;
    this.postData.zone = plantZone;
    this.postData.perFoot = perFoot;
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

}



