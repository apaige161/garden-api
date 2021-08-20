import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Harvest } from '../models/harvest';
import { HarvestService } from '../services/harvest.service';

@Component({
  selector: 'app-harvest',
  templateUrl: './harvest.component.html',
  styleUrls: ['./harvest.component.css']
})
export class HarvestComponent implements OnInit {

  /****************************************************************************************
   * 
   * 
   * TODO: create a new model on backend for harvested data
   * 
   * 
   * Fetch harvested plants from database for user only
   *  -TODO: filter on client side for now
   *  -TODO: filter on backend
   * 
   * TODO: when user doesn't have any harvested plants
   *  -display: a page showing that no plants have been harvested yet, go plant some shit
   * 
   * TODO: be able to sort by year, plantType
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   * 
   ****************************************************************************************/

  harvestSubscription: Subscription;
  harvest: Harvest[];


  constructor(private plantHarvest: HarvestService) { }

  ngOnInit(): void {
    this.harvestSubscription = this.plantHarvest.getHarvest().subscribe(harvest => {
      this.harvest = harvest;
    })
  }

}
