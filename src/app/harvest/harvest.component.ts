import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
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
   * TODO: set star values to show correct rating on each item
   * 
   * 
   * 
   * 
   * 
   * 
   ****************************************************************************************/

  harvestSubscription: Subscription;
  harvest: Harvest[];

  rating: number;
  ratingArr: boolean[] = [] //true = solid star, false = empty star
  starCount: number = 5;


  constructor(private plantHarvest: HarvestService) {
    //initialize star rating arr
    //fill array with false values = all stars with be blank
    this.ratingArr = Array(this.starCount).fill(false);
   }

  ngOnInit(): void {
    this.harvestSubscription = this.plantHarvest.getHarvest().subscribe(harvest => {
      this.harvest = harvest;
    })
  }

  //access quailty of harvest by this.rating
  //Rating by stars
  faStar = faStar;

  getRating() {

  }

  //determine what stars are solid/empty
  returnStar(i: number, quality: number) {
    if(quality >= i + 1) {
      return 'star'
    } else {
      return 'star_border'
    }
  }

}
