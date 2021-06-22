import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    this.singlePlant.datePlanted = this.newDate;
    //send updated date -> service -> database to be stored
    if(this.singlePlant.datePlanted) {
      this.plantService.updateOnePlant(
        this.singlePlant._id,
        this.singlePlant.datePlanted,
      )
    }
    
  }

  /**************************************************************************************
  * 
  * harvest progress logic
  *   TODO: fix negative values on progressToHarvest
  *  
  **************************************************************************************/

  //run for each loop over selected garden items to get date data

  getPlantProgress() {

    const today: Date = new Date();

    let plantedOn: Date;
    let harvestOnDate: Date;
    const oneDay: number = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

    //get how many days til harvest
    //harvestIn = plant.daysToHarvest;

    //parse JSON date into date -- JSON returns a string
    plantedOn = new Date( this.singlePlant.datePlanted );

    //add number of days to planting date
    harvestOnDate = new Date();
    harvestOnDate.setDate(plantedOn.getDate() + this.singlePlant.daysToHarvest);

    //calculate how many days are left until dateToHarvest
    const timeDiff = harvestOnDate.getTime() - today.getTime();
    this.singlePlant.daysLeftToHarvest = Math.round(timeDiff / oneDay);

    //calculate how many days are left and return a whole number to pass to spinner
    //calculate % out of 100 based on how many days are left to harvest
    this.singlePlant.progressToHarvest = Math.round((1 - (this.singlePlant.daysLeftToHarvest / this.singlePlant.daysToHarvest)) * 100);

    if(this.singlePlant.progressToHarvest >= 100) {
      this.singlePlant.progressToHarvest = 100;
    }

  };

  //progress bar logic
  color: ThemePalette = 'primary';
  value: number = 0; //out of 100
  diameter = 50;
  

  ngOnInit() {

    this.getSinglePlant(this.data._id).subscribe(plant => {
      this.singlePlant = plant
      this.getPlantProgress();
    });

    

  }

  ngOnDestroy() {
    //pass in data to be transfered
    this.matDialogRef.close(this.data)

  }

}
