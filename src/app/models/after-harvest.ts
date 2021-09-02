

//not sure if this will be used or not

export interface AfterHarvest {
    owner: string;
    date: Date;
    plant: string;
    quality: number;
    quantity: number;
    garden: string;
    plantType: string;
    notes: string;
    transformed: boolean;
}
