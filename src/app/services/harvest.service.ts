import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Harvest } from '../models/harvest';

@Injectable({
  providedIn: 'root'
})
export class HarvestService {

  today = new Date();
  plants: Observable<Harvest[]>;

  url = 'http://localhost:3000/api/harvest';

  harvestData: Harvest = {
    owner: "",
    date: this.today,
    plant: "",
    quality: null,
    quantity: null,
    garden: "",
    plantType: "",
    notes: "",
    transformed: false,
  }

  constructor(private http: HttpClient) { }

  /**************************************************************
   * 
   * GET
   * 
   **************************************************************/

  //get all plants
  getHarvest() {
    return this.http.get<Harvest[]>(this.url);
  }

  /**************************************************************
   * 
   * POST
   * 
   **************************************************************/

   newPlantToHarvest(harvest: Harvest) 
      {
      this.harvestData.owner = harvest.owner;
      this.harvestData.date = harvest.date;
      this.harvestData.plant = harvest.plant;
      this.harvestData.quality = harvest.quality;
      this.harvestData.quantity = harvest.quantity;
      this.harvestData.garden = harvest.garden;
      this.harvestData.plantType = harvest.plantType;
      this.harvestData.notes = harvest.notes;

      //return as a promise
      this.http.post(this.url, this.harvestData)
        .subscribe(data => {
        console.log("Service data notes: " + this.harvestData.notes);
    })
  }

  /**************************************************************
   * 
   * DELETE
   * 
   **************************************************************/

   deleteOne(id) {
    //console.log("continue with deletion from service, id: " + id)
    return this.http.delete(this.url+'/'+id)
  }








}
