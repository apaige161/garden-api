import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.css']
})
export class HarvestComponent implements OnInit {

  /****************************************************************************************
   * 
   * Fetch harvested plants from database for user only
   *  -TODO: filter on client side for now
   *  -TODO: filter on backend
   * 
   * TODO: when user doesn't have any harvested plants
   *  -display: a page showing that no plants have been harvested yet, go plant some shit
   * 
   * TODO: create model on angular to hold harvested data
   * TODO: create model on node to hold harvested data/store in DB
   * 
   * TODO: update current plant models to hold multiHarvest: bool value
   * 
   * 
   * TODO: be able to sort by year
   * 
   * 
   * 
   * 
   * 
   * 
   * const harvestData = {
      owner: string,
      date: date,
      plant: string,
      perFoot: number,
      plantType: string,
    }
   * 
   * 
   * 
   ****************************************************************************************/

  constructor() { }

  ngOnInit(): void {
  }

}
