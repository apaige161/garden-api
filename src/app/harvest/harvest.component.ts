import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.css']
})
export class HarvestComponent implements OnInit {

  /****************************************************************************************
   * 
   * TODO: build out form for user to harvest
   * 
   * 
   * Fetch harvested plants from database for user only
   *  -TODO: filter on client side for now
   *  -TODO: filter on backend
   * 
   * TODO: when user doesn't have any harvested plants
   *  -display: a page showing that no plants have been harvested yet, go plant some shit
   * 
   * 
   * 
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
