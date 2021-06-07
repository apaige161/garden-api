
//interface to communicate with DB

export interface SinglePlant {
    _id: number,
    plant: string;
    garden: string;
    season: string;
    zone: string;
    perFoot: number;
    xGarden: number;
    yGarden: number;
    col: number;
}

