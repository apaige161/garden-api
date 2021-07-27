import { DatePipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SinglePlant } from '../models/single-plant';
import { PlantServerService } from '../services/plant-server.service';
import { addDays, differenceInDays, startOfDay  } from 'date-fns'

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit, OnDestroy {

  singlePlant: any;
  newDate: Date;
  hideDatePicker: boolean = true;
  plantSubscription: Subscription;
  addAWeekModified: boolean = false;

  growthModifier: number = 1;
  hideGrowthModifier: boolean = true;

  constructor( 
    @Inject(MAT_DIALOG_DATA) 
    public data: {_id: string}, 
    private matDialogRef: MatDialogRef<MoreInfoComponent>,
    private plantService: PlantServerService
  ) { }

  closeInfo() {
    this.matDialogRef.close();
  }

  toggleHideDatePicker() {
    this.hideDatePicker = !this.hideDatePicker;
  }

  toggleHideGrowthModifier() {
    this.hideGrowthModifier = !this.hideGrowthModifier;
  }

  getSinglePlant(id: string) {
    return this.plantService.getOnePlant(id)
  }

  saveNewDate() {
    if(this.newDate != this.singlePlant.datePlanted && this.newDate) {
      this.singlePlant.datePlanted = this.newDate;

      this.getPlantProgress(this.singlePlant);

      //send updated date -> service -> database to be stored

      //update when planted
      this.plantService.updateOnePlantPlanted(
        this.singlePlant._id,
        this.singlePlant.datePlanted,
      )

      console.log("Should update dateToHarvest to: " + this.singlePlant.dateToHarvest)
      //update when harvest time
      this.plantService.updateOnePlantHarvested(
        this.singlePlant._id,
        this.singlePlant.dateToHarvest
        
      )
    }
  }

  saveNewGrowthModifier() {
    //send updated GrowthModifier -> service -> database to be stored

    //update growthModifier
    this.plantService.updateOnePlantGrowthModifier(
      this.singlePlant._id,
      this.singlePlant.growthModifier,
    )

  }

  /**************************************************************************************
  * 
  * harvest progress logic
  *   TODO: fix addOneWeek
  *   -code updates and send request to change the date, then it gets changed back
  *  
  **************************************************************************************/

  addOneWeek(plant) {

    //add 7 days
    plant.dateToHarvest = new Date( plant.dateToHarvest );
    plant.dateToHarvest = addDays(plant.dateToHarvest, 7);

    //set

    console.log("updating harvest date");
    //save to DB
    this.plantService.updateOnePlantHarvested(
      plant._id,
      plant.dateToHarvest
    )
    console.log("updated harvest date to: " + plant.dateToHarvest);

    this.addAWeekModified = true;
  }

  //run for each loop over selected garden items to get date data

  getPlantProgress(plant) {

    const today: Date = new Date();

    //parse JSON date into date -- JSON returns a string
    plant.datePlanted = new Date( plant.datePlanted );
    plant.datePlanted = startOfDay(plant.datePlanted);
    
    //add number of days to planting date, factor in growth conditions
    plant.daysToHarvest = Math.round(plant.daysToHarvest / plant.growthModifier )
    plant.dateToHarvest = new Date();
    plant.dateToHarvest = startOfDay(plant.dateToHarvest);
    plant.dateToHarvest = addDays(plant.datePlanted, plant.daysToHarvest);

    //calculate how many days are left until dateToHarvest
    //how many days are between today and expected harvest date
    plant.daysLeftToHarvest = differenceInDays(plant.dateToHarvest.getTime(), today.getTime())

    //calculate how many days are left and return a whole number to pass to spinner
    //calculate % out of 100 based on how many days are left to harvest
    plant.progressToHarvest = Math.round(( 1 - (plant.daysLeftToHarvest / plant.daysToHarvest)) * 100);

    if(plant.daysLeftToHarvest <= 0) {
      plant.progressToHarvest = 100;
      plant.dateToHarvest = today;
      plant.daysLeftToHarvest = 0;
    }


  }

  //progress bar logic
  color: ThemePalette = 'primary';
  value: number = 0; //out of 100
  diameter = 50;
  

  ngOnInit() {

    this.plantSubscription = this.getSinglePlant(this.data._id).subscribe(plant => {
      //console.log(plant);
      this.singlePlant = plant
      //console.log(this.singlePlant);
      this.getPlantProgress(this.singlePlant);
      console.log(this.singlePlant);
    });

    

    

  }

  ngOnDestroy() {

    this.plantSubscription.unsubscribe();

    //pass in data to be transfered
    this.matDialogRef.close(this.data)


  }

}
