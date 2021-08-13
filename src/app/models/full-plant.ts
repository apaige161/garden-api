
//client side only

export interface FullPlant {
    plant: string,
    plantType: string;
    season: string,
    perFoot: number,

    multiHarvest: boolean,
    growthModifier: number;
    daysToHarvest: number;
    datePlanted: Date;
    dateToHarvest: Date;
    daysLeftToHarvest: number;
    progressToHarvest: number;
    zone: string,
    col: number,
}

