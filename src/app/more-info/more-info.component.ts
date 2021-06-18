import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css']
})
export class MoreInfoComponent implements OnInit, OnDestroy {

  constructor( @Inject(MAT_DIALOG_DATA) public data: {number: number}, private matDialogRef: MatDialogRef<MoreInfoComponent> ) { }

  closeInfo() {
    this.matDialogRef.close();
  }





  ngOnInit(): void {
    //alert(this.data)
  }

  ngOnDestroy() {
    //pass in data to be transfered
    this.matDialogRef.close(this.data)
  }

}
