
//client side only

export interface FullPlant {
    plant: string,
    season: string,
    perFoot: number,
    daysToHarvest: number;
    datePlanted: Date;
    dateToHarvest: Date;
    daysLeftToHarvest: number;
    progressToHarvest: number;
    zone: string,
    col: number,
}
