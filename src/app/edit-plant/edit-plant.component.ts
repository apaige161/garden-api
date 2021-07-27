import { OnDestroy } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { addDays, differenceInDays, startOfDay } from 'date-fns';
import { Subscription } from 'rxjs/internal/Subscription';
import { PlantServerService } from '../services/plant-server.service';

@Component({
  selector: 'app-edit-plant',
  templateUrl: './edit-plant.component.html',
  styleUrls: ['./edit-plant.component.css']
})
export class EditPlantComponent implements OnInit, OnDestroy {

  plantSubscription: Subscription;
  singlePlant: any;
  hideDatePicker: boolean = true;
  growthModifier: number = 1;
  hideGrowthModifier: boolean = true;

  editPlant: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: {_id: string}, 
    private matDialogRef: MatDialogRef<EditPlantComponent>,
    private plantService: PlantServerService
    ) { }


  getSinglePlant(id: string) {
    return this.plantService.getOnePlant(id)
  }

  //close dialog box 
  closeInfo() {
    this.matDialogRef.close();
    console.log("dialog closed successfully");
  }

  toggleHideDatePicker() {
    this.hideDatePicker = !this.hideDatePicker;
  }

  toggleHideGrowthModifier() {
    this.hideGrowthModifier = !this.hideGrowthModifier;
  }

  toggleEditPlant() {
    this.editPlant = true;
  }

  //send updated object through plant-server service
  saveUpdatedData() {
    console.log("patch data triggered");
  }

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

  ngOnInit() {
    this.plantSubscription = this.getSinglePlant(this.data._id).subscribe(plant => {

      this.singlePlant = plant
      this.getPlantProgress(this.singlePlant);

    });
  }

  ngOnDestroy() {
    //pass in data to be transfered
    this.matDialogRef.close(this.data)
  }

}
