



/********************************************************
 * 
 * Use this model to send requests to and from data base
 * 
 ********************************************************/





import { SinglePlant } from './single-plant';

export interface IGarden {
    name: string;
    allPlants: SinglePlant[];
}
