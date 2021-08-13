import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { SinglePlant } from '../models/single-plant';
import { FullPlant } from '../models/full-plant';
import { PlantServerService } from '../services/plant-server.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { addDays, differenceInDays, startOfDay   } from 'date-fns'

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { PlantDataService } from '../services/plant-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main2.component.html',
  styleUrls: ['./main2.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class Main2Component implements OnInit {

  /**
   * 
   * App allows user to: 
   *  select the size of their raised bed
   *  stage plants to put into a raised bed
   *  save up to 4 arrays(columns) into a single saved garden bed
   * 
   */

  constructor(private plantService: PlantServerService, 
    private http: HttpClient, 
    private route: ActivatedRoute,
    private plantData: PlantDataService) {
    
   }


  @Input()

  title = 'my-garden';
  currentDate: Date = new Date();

  //max number of square feet
  xGardenMax: number = 4;
  yGardenMax: number = 4;

  xGardenDisable: boolean = false;
  yGardenDisable: boolean = false;

  growthModifier: number = 1;

  

  
  

  /*** Progress variables ***/
  spaceAvailable = 0;
  plantsInProposedGarden = 0;
  progress = 0;

  factor = 0;
  disableAddPlants = true;

  //used for error handling
  test = 0;

  //arrays to hold the plant objects
  vegatablesArr: FullPlant[] = this.plantData.vegatables;
  herbsArr: FullPlant[] = this.plantData.herbs;
  flowersArr: FullPlant[] = this.plantData.flowers;

  //radio button properties
  favoritePlantType: string = 'vegatables'
  plantTypes: string[] = ['vegatables', 'herbs', 'flowers'];

  favoriteSeason: string = 'spring';
  seasons: string[] = ['spring', 'summer', 'fall', 'winter'];


  //arrays where plants can be stored
  fullPlant: FullPlant[] = [];
  
  //staging area

  firstCol: FullPlant[] = [];

  secondCol: FullPlant[] = [];

  thirdCol: FullPlant[] = [];

  fourthCol: FullPlant[] = [];
  
  gardenName:string = "New Garden";



  garden = [this.firstCol, this.secondCol, this.thirdCol, this.fourthCol];


  //holds the value of each column of plants
  savePlants: [FullPlant[]];

  /**************************************************************************************************************
  
    add a plant to garden when clicked on

    the button in the html gets the index of the item and sends it to be added as an index number
      from plants
  
  *************************************************************************************************************/

  
  //save name from user input && store values
  /*** Add validation to not allow saving unnamed gardens **/

  // true = disabled
  saveDisable: boolean = true;

  

  
  canSave(){
    if((this.progress > 1) && (this.gardenName.length > 2)){

      //this.removeDuplicates(this.gardenNames);

      //check input name to existing names to validate
      //break out of function if one is found
      

      for (let index = 0; index <= this.gardenNames.length; index++) {
        //console.log(index + ".) " + this.gardenNames[index]);
        
        if(this.gardenNames.length = 0) {
          this.saveDisable = false;
            console.log("no current gardens, allow save")
        }
        

        if(this.gardenNames[index] != this.gardenName){
          this.saveDisable = false;
          console.log("no current gardens with the same name, allow save")
        } else { 
          this.saveDisable = true;
          console.log("a duplicate name was discovered, try a new name, no save allowed")
          break;
        }
        
      }
    }
  }
  







  /*****************************************************************************************************
   * 
   * progress bar logic
   * 
   ******************************************************************************************************/
  totalPossiblePlants(){
    this.spaceAvailable = this.xGardenMax * this.yGardenMax
  }

  

  addToProgressBar() {
    this.progress = this.progress + (this.factor);
  }

  resetProgress(){
    this.progress = 0;
    this.gardenName = '';
    this.disableAddPlants = false;
    this.firstCol = [];
    this.secondCol = [];
    this.thirdCol = [];
    this.fourthCol = [];

    //enable booleans
    this.xGardenDisable = false;
    this.yGardenDisable = false;
  }

  /*
  subtractFromSpaceAvailable(num: number) {
    this.spaceAvailable = (this.spaceAvailable - this.factor) * num;
    //this.totalPossiblePlants();
  }
  */

  
  calculateProgress() {

    //cannot add plants
    this.disableAddPlants = true;

    //each item will ake up this much room
    this.factor = 100 / this.spaceAvailable;

    //error handling
    if((this.test = this.factor * this.spaceAvailable) != 100) {
      console.log("There was an error in calculating the progress of proposed garden")
    }
      
    if(this.progress < (100)){

      //enable adding plants
      this.disableAddPlants = false;

      //add in the last plant to total, check if that plant makes it 100% full
      if((this.progress + this.factor) >= 100) {
        this.disableAddPlants = true;
        
      }
    }

  }

  
  

  

  /***************************************************************************************************
   * 
   * add plants to columns here
   *  TODO: replace fullPlant with: vegtables, herbs, or flowers 
   *    -depending on which list is being selected
   * 
   **************************************************************************************************/
  addToGarden(plantToAdd: number, plantType: string) {

    //create a new object to push 
    let plant: any = Object.create(this.fullPlant);

    if(plantType === 'vegatables') {
      plant = {
        plant: this.vegatablesArr[plantToAdd].plant,
        plantType: this.vegatablesArr[plantToAdd].plantType,
        season: this.vegatablesArr[plantToAdd].season,
        growthModifier: this.vegatablesArr[plantToAdd].growthModifier,
        perFoot: this.vegatablesArr[plantToAdd].perFoot,
        multiHarvest: this.vegatablesArr[plantToAdd].multiHarvest,
        daysToHarvest: this.vegatablesArr[plantToAdd].daysToHarvest,
        datePlanted: this.currentDate,
        zone: this.vegatablesArr[plantToAdd].zone,
        col: 0,
      }
    } else if (plantType === 'herbs') {
      plant = {
        plant: this.herbsArr[plantToAdd].plant,
        plantType: this.herbsArr[plantToAdd].plantType,
        season: this.herbsArr[plantToAdd].season,
        growthModifier: this.herbsArr[plantToAdd].growthModifier,
        perFoot: this.herbsArr[plantToAdd].perFoot,
        multiHarvest: this.vegatablesArr[plantToAdd].multiHarvest,
        daysToHarvest: this.herbsArr[plantToAdd].daysToHarvest,
        datePlanted: this.currentDate,
        zone: this.herbsArr[plantToAdd].zone,
        col: 0,
      }
    } else if (plantType === 'flowers') {
      plant = {
        plant: this.flowersArr[plantToAdd].plant,
        plantType: this.flowersArr[plantToAdd].plantType,
        season: this.flowersArr[plantToAdd].season,
        growthModifier: this.flowersArr[plantToAdd].growthModifier,
        perFoot: this.flowersArr[plantToAdd].perFoot,
        multiHarvest: this.vegatablesArr[plantToAdd].multiHarvest,
        daysToHarvest: this.flowersArr[plantToAdd].daysToHarvest,
        datePlanted: this.currentDate,
        zone: this.flowersArr[plantToAdd].zone,
        col: 0,
      }
    }
    

    if( (this.xGardenMax * this.yGardenMax) 
      > (this.firstCol.length 
          + this.secondCol.length 
          + this.thirdCol.length 
          + this.fourthCol.length) 
    ) {
      //push plant to first row
      if(this.firstCol.length <= (this.yGardenMax -1)) {
        this.firstCol.push(plant);
      }

      //push plant to second row
      else if( (this.firstCol.length >= (this.yGardenMax -1)) && (this.secondCol.length <= (this.yGardenMax -1)) ) {
        this.secondCol.push(plant);
      }

      //push plant to third row
      else if( (this.secondCol.length >= (this.yGardenMax -1)) && (this.thirdCol.length <= (this.yGardenMax -1))) {
        this.thirdCol.push(plant);
      }

      //push plant to fourth row
      else if( (this.thirdCol.length >= (this.yGardenMax -1)) && (this.fourthCol.length <= (this.yGardenMax -1))) {
        this.fourthCol.push(plant);
      }
    }
  }

  correctColumns(){
    this.firstCol.forEach(item => {
      item.col = 1;
    });

    this.secondCol.forEach(item => {
      item.col = 2;
    });

    this.thirdCol.forEach(item => {
      item.col = 3;
    });

    this.fourthCol.forEach(item => {
      item.col = 4;
    });
  }

  //drop event, for drag and drop
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }


  //remove item by index
  removeFromGarden(removePlant: number) {
    this.garden.splice(removePlant, 1);
  }

  disableGardenMax(){
    //disable booleans
    this.xGardenDisable = true;
    this.yGardenDisable = true;

  }

  //reset garden array
  clearGarden() {
    
    this.garden = [];
    

  }



  /** clear columns and items in columns **/
  removeFromFirstColumn(removePlant: number) {
    this.firstCol.splice(removePlant, 1);
  }

  clearColumn(column) {
    //remove this many plants from progress
    this.progress -= (column.length * this.factor);

    if(column == this.firstCol) {
      //reset col
      this.firstCol = [];
    } else if(column == this.secondCol) {
      this.secondCol = [];
    } else if(column == this.thirdCol) {
      this.thirdCol = [];
    } else if(column == this.fourthCol) {
      this.fourthCol = [];
    }
    

    //if there is room in the garden allow adding of plants
    if(this.progress < 100) {
      this.disableAddPlants = false;
    }
  }



 

  /*** calculates when to stop allowing user to ad plants in staging area ***/
  ///Do not think i need this
  gardenfull() {
    if(this.garden.length == this.xGardenMax){
      return true;
    } else {
      return false;
    }
  }



  /*************************************************************************************************
   * 
   * Save data to the DB
   * 
   * 
   * -This is where I need to change sending each item to sending as an array
   * 
   ***********************************************************************************************/
  
  postToDb(){

    var sendToDb = this.firstCol.concat(this.secondCol, this.thirdCol, this.fourthCol)

    //set owner property for each plant
    const currentOwner = localStorage.getItem("userEmail")

    //run date logic an set appropriate properties
    this.setEachDatePlanted(sendToDb);

    sendToDb.forEach(item => {
      this.plantService.newPlant( 
        currentOwner,
        item.plant, 
        item.plantType,
        this.gardenName, 
        item.season, 
        item.zone, 
        item.perFoot, 
        item.multiHarvest,
        this.growthModifier,
        item.daysToHarvest,
        this.currentDate,
        item.dateToHarvest,
        item.daysLeftToHarvest,
        item.progressToHarvest,
        this.xGardenMax, 
        this.yGardenMax, 
        item.col)
    })
    
  }
  


  /***********************************************************************************************
   * 
   * get plants
   * 
  ***********************************************************************************************/

  plants: SinglePlant[];

  readonly url = 'http://localhost:3000/api/gardens';

  /***************************************************************************
    * 
    * START sort and filter
  ***************************************************************************/

  Garden = 'full garden';
  SearchGarden = '';
  gardenNames = [];
  singleGardenNames = [];

  SortByParam = 'garden';
  SortDirection = 'asc'

  


  
  //filter button logic
  onGardenFilter() {
    this.SearchGarden = this.Garden;
  }
  

  onGardenFilterClear() {
    this.SearchGarden = '';
    this.Garden = '';
  }

  //sort direction toggle
  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }

  /****************************************************************
  * 
  * END sort and filter
  * 
  ****************************************************************/

  allPlantsinit() {
    this.plantService.getPlants()
      .subscribe(data => this.plants = data);
  }

  deletePlant(id:string) {
    this.plantService.deleteOne(id).subscribe( res => {
      //refresh list
      this.allPlantsinit();
    })
  }

  deleteAllPlants(){

    console.log("delete all attempt start");

    //loop over each id and send the request
    this.plants.forEach(data => {
      this.plantService.deleteOne(this.url+'/'+data._id).subscribe(res => {
      })
    })
    //refresh list
    this.allPlantsinit();
  }


  /**************************************************************************************
  * 
  * harvest progress logic
  *  
  **************************************************************************************/

  //run for each loop over selected garden items to capture date planted

  //TODO: send updated values to DB or do this logic somewhere else --done
    //--only do this for the selected garden to improve performance
    //does not take long with a short number of gardens but will not scale
    setEachDatePlanted(plantArr) {

      const today: Date = new Date();
  
      plantArr.forEach(plant => {
  
        //parse JSON date into date -- JSON returns a string
        plant.datePlanted = startOfDay(today);
  
        //add number of days to planting date
        plant.dateToHarvest = new Date();

        plant.daysToHarvest = Math.round(plant.daysToHarvest / plant.growthModifier )
        plant.dateToHarvest = addDays(plant.datePlanted, plant.daysToHarvest);
  
        //calculate how many days are left until dateToHarvest
        //how many days are between today and expected harvest date
        plant.daysLeftToHarvest = differenceInDays(plant.dateToHarvest.getTime(), today.getTime())

        //calculate how many days are left and return a whole number to pass to spinner
        //calculate % out of 100 based on how many days are left to harvest
        plant.progressToHarvest = 0;

  
      });
    }
  
  
    
    
  
  
     
  
    /**************************************************************************************
    * 
    * END harvest progress spinner logic
    *  
    **************************************************************************************/

  //remove duplicates
  removeDuplicates(arr){

    //convert to a set which only allows unique values
    const uniqueSet = new Set(arr);

    //convert back to an array
    this.singleGardenNames = [...uniqueSet];
    console.log('removed duplicate garden names')

  }

  ngOnInit() {

    //this.allPlantsinit();
    
    this.totalPossiblePlants();
    this.calculateProgress();

    this.currentDate = new Date();
    console.log(this.currentDate);

    
  }

  //TODO: get all changes of gardenName


  
}
