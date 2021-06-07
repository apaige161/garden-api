import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  //filter by key words

  transform(value: any[], filterString:string, propName:string): any[] {

    const resultArray = [];

    //check for values
    //value.length give an error (TypeError: Cannot read property 'length' of undefined) but still functions as it should??
    if(value) {
      if(value.length === 0 ||filterString === '' || propName === '') {
        return value;
      }
  
      //loop over values
      for ( const item of value ) {
        //if value === filter string add to new array
        if(item[propName] === filterString) {
          resultArray.push(item);
        }
      }
  
      return resultArray;
    }
    
  }

}
