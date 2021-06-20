
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
    dateToHarvest: Date;
    daysLeftToHarvest: number;
    progressToHarvest: number;

    xGarden: number;
    yGarden: number;
    col: number;
}

