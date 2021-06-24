import { DatePipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SinglePlant } from '../models/single-plant';
import { PlantServerService } from '../services/plant-server.service';

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

  constructor( 
    @Inject(MAT_DIALOG_DATA) 
    public data: {_id: string}, 
    private matDialogRef: MatDialogRef<MoreInfoComponent>,
    private plantService: PlantServerService
  ) { }

  closeInfo() {
    this.matDialogRef.close();
  }

  toggleShowDatePicker() {
    this.hideDatePicker = !this.hideDatePicker;
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

  /**************************************************************************************
  * 
  * harvest progress logic
  *   TODO: fix negative values on progressToHarvest
  *   TODO: harvest date is never updated
  *  
  **************************************************************************************/

  //run for each loop over selected garden items to get date data

  getPlantProgress(plant) {

    const today: Date = new Date();

    console.log(typeof plant.dateToHarvest);

    const oneDay: number = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    //get how many days til harvest
    //harvestIn = plant.daysToHarvest;

    //parse JSON date into date -- JSON returns a string
    plant.datePlanted = new Date( plant.datePlanted );

    //add number of days to planting date
    plant.dateToHarvest = new Date();
    plant.dateToHarvest.setDate(plant.datePlanted.getDate() + plant.daysToHarvest);

    //calculate how many days are left until dateToHarvest
    const timeDiff = Math.abs( today.getTime() - plant.dateToHarvest.getTime() );
    plant.daysLeftToHarvest = Math.round(timeDiff / oneDay);

    //calculate how many days are left and return a whole number to pass to spinner
    //calculate % out of 100 based on how many days are left to harvest
    plant.progressToHarvest = Math.round(( 1 - (plant.daysLeftToHarvest / plant.daysToHarvest)) * 100);

  }

  //progress bar logic
  color: ThemePalette = 'primary';
  value: number = 0; //out of 100
  diameter = 50;
  

  ngOnInit() {

    this.plantSubscription = this.getSinglePlant(this.data._id).subscribe(plant => {
      console.log(plant);
      this.singlePlant = plant
      //console.log(this.singlePlant);
      this.getPlantProgress(this.singlePlant);
      //console.log(this.singlePlant);
    });

    

    

  }

  ngOnDestroy() {

    this.plantSubscription.unsubscribe();

    //pass in data to be transfered
    this.matDialogRef.close(this.data)


  }

}
