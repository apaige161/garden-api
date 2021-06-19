import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SinglePlant } from '../models/single-plant';
import { PlantServerService } from '../services/plant-server.service';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit, OnDestroy {

  constructor( 
    @Inject(MAT_DIALOG_DATA) 
    public data: {_id: string}, 
    private matDialogRef: MatDialogRef<MoreInfoComponent>,
    private plantService: PlantServerService
  ) { }

  closeInfo() {
    this.matDialogRef.close();
  }

  singlePlant: any;

  getSinglePlant(id: string) {
    return this.plantService.getOnePlant(id)
  }
  





  ngOnInit() {
    //TODO: this returns an observable but im not subscribed to it
    this.singlePlant = this.getSinglePlant(this.data._id);
    console.log(this.singlePlant);
  }

  ngOnDestroy() {
    //pass in data to be transfered
    this.matDialogRef.close(this.data)
  }

}
