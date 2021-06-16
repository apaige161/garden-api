
//interface to communicate with DB

export interface SinglePlant {
    _id: number;
    plant: string;
    garden: string;
    season: string;
    zone: string;
    perFoot: number;
    daysToHarvest: number;
    datePlanted: Date;
    
    //add to server side as required: false
    dateToHarvest: Date;
    daysLeftToHarvest: number;

    xGarden: number;
    yGarden: number;
    col: number;
}

