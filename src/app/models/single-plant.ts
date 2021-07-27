
//interface to communicate with DB

export interface SinglePlant {
    _id: string;
    owner: string;
    plant: string;
    plantType: string;
    garden: string;
    season: string;
    zone: string;
    perFoot: number;
    
    growthModifier: number;
    daysToHarvest: number;
    datePlanted: Date;
    dateToHarvest: Date;
    daysLeftToHarvest: number;
    progressToHarvest: number;

    xGarden: number;
    yGarden: number;
    col: number;
}


