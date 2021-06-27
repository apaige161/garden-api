import { Injectable } from '@angular/core';
import { FullPlant } from '../models/full-plant';

@Injectable({
  providedIn: 'root'
})

/******************************************************************************************************
* 
* hold plant objects
* 
******************************************************************************************************/
export class PlantDataService {

  constructor() { }

  vegatables: FullPlant[] = [
    {
      plant: 'empty',
      season: 'spring, summer, fall, winter',
      perFoot: 1,
      daysToHarvest: 0,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'beans, bush',
      season: 'spring, fall',
      perFoot: 1,
      daysToHarvest: 70,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'beans, pole',
      season: 'spring, fall',
      perFoot: 1,
      daysToHarvest: 56,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'beets',
      season: 'spring, fall',
      perFoot: 9,
      daysToHarvest: 56,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'broccoli',
      season: 'spring, fall',
      perFoot: 1,
      daysToHarvest: 112,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'cabbage',
      season: 'summer',
      perFoot: 1,
      daysToHarvest: 112,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'carrot',
      season: 'spring, fall',
      perFoot: 16,
      daysToHarvest: 70,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'cauliflower',
      season: 'spring, fall',
      perFoot: 1,
      daysToHarvest: 98,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'chard, swiss',
      season: 'spring, fall',
      perFoot: 2,
      daysToHarvest: 56,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'corn',
      season: 'summer',
      perFoot: 4,
      daysToHarvest: 63,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'cucumber',
      season: 'spring, fall',
      perFoot: 1,
      daysToHarvest: 42,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'eggplant',
      season: 'summer',
      perFoot: 1,
      daysToHarvest: 133,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'leeks',
      season: 'spring, fall',
      perFoot: 6,
      daysToHarvest: 98,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'lettuce, leaf',
      season: 'spring, summer, fall, winter',
      perFoot: 16,
      daysToHarvest: 49,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'lettuce, head',
      season: 'spring, summer, fall, winter',
      perFoot: 1,
      daysToHarvest: 49,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'melon',
      season: 'summer',
      perFoot: .5,
      daysToHarvest: 84,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'okra',
      season: 'summer',
      perFoot: 1,
      daysToHarvest: 84,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'onion',
      season: 'spring, summer',
      perFoot: 1,
      daysToHarvest: 140,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'parsley',
      season: 'spring, summer, fall, winter',
      perFoot: 1,
      daysToHarvest: 98,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'parsnips',
      season: 'spring, fall',
      perFoot: 9,
      daysToHarvest: 105,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'pea, sugar snap',
      season: 'spring, fall',
      perFoot: 8,
      daysToHarvest: 70,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'pepper, hot',
      season: 'summer',
      perFoot: 1,
      daysToHarvest: 133,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'pepper, mild',
      season: 'summer',
      perFoot: 1,
      daysToHarvest: 133,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'pepper, bell',
      season: 'summer',
      perFoot: 1,
      daysToHarvest: 133,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'potato',
      season: 'spring, summer, fall',
      perFoot: 1,
      daysToHarvest: 84,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'pumpkin, vine',
      season: 'spring, fall',
      perFoot: .5,
      daysToHarvest: 84,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'radish',
      season: 'spring, summer, fall',
      perFoot: 16,
      daysToHarvest: 28,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'spinach',
      season: 'spring, summer, fall',
      perFoot: 9,
      daysToHarvest: 49,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'strawberry',
      season: 'spring, fall',
      perFoot: 4,
      daysToHarvest: 70,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'squash, vine',
      season: 'summer',
      perFoot: .5,
      daysToHarvest: 28,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'tomato, vine',
      season: 'summer',
      perFoot: 1,
      daysToHarvest: 28,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },

  ];
  herbs: FullPlant[] = [
    {
      plant: 'empty',
      season: 'spring, summer, fall, winter',
      perFoot: 1,
      daysToHarvest: 0,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'basil',
      season: 'spring, fall',
      perFoot: 2,
      daysToHarvest: 84,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'chive',
      season: 'spring, summer',
      perFoot: 16,
      daysToHarvest: 112,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'cilantro',
      season: 'late spring, summer',
      perFoot: 1,
      daysToHarvest: 35,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'mint',
      season: 'spring, summer, fall',
      perFoot: 1,
      daysToHarvest: 35,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'oregano',
      season: 'spring, summer, fall',
      perFoot: 1,
      daysToHarvest: 112,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },

  ];
  flowers: FullPlant[] = [
    {
      plant: 'empty',
      season: 'spring, summer, fall, winter',
      perFoot: 1,
      daysToHarvest: 0,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'dahlia, small',
      season: 'summer, fall',
      perFoot: 4,
      daysToHarvest: 70,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'dahlia, medium',
      season: 'summer, fall',
      perFoot: 1,
      daysToHarvest: 70,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'dusty miller',
      season: 'late spring, summer, fall',
      perFoot: 4,
      daysToHarvest: 105,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'marigold',
      season: 'summer, fall',
      perFoot: 1,
      daysToHarvest: 70,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'pansy',
      season: 'spring, summer, fall',
      perFoot: 4,
      daysToHarvest: 140,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'petunia',
      season: 'late spring, summer, early fall',
      perFoot: 4,
      daysToHarvest: 98,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },
    {
      plant: 'salvia',
      season: 'late spring, summer, early fall',
      perFoot: 4,
      daysToHarvest: 98,
      datePlanted: null,
      dateToHarvest: null,
      daysLeftToHarvest: null,
      progressToHarvest: null,
      zone: '7b',
      col: 0
    },

  ];

}
