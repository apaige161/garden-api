import { OnDestroy } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-plant',
  templateUrl: './edit-plant.component.html',
  styleUrls: ['./edit-plant.component.css']
})
export class EditPlantComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: {number: number}, 
    private matDialogRef: MatDialogRef<EditPlantComponent>
    ) { }

  //close dialog box 
  closeInfo() {
    this.matDialogRef.close();
  }

  //send updated object through plant-server service
  saveUpdatedData() {
    console.log("patch data triggered")
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    //pass in data to be transfered
    this.matDialogRef.close(this.data)
  }

}
