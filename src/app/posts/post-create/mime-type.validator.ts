
//creates file type validation

//get value of control
//read
//check type of file

import { AbstractControl } from'@angular/forms';
import { Observable, Observer, of } from 'rxjs';

//returns async promise or observable
export const mimeType = ( control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
    
    if (typeof(control.value) === 'string') {
        return of(null);
      }
    
    const file = control.value as File;
    const fileReader = new FileReader();
    //create observable
    const fileReaderObservable = new Observable((observer: Observer<{[key: string]: any}>) => {
        fileReader.addEventListener("loadend", () => {
            //emit information based on if valid file or not
            //mime type validation

            //allows for reading certain patterns in the file
            const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);

            //read pattern
            let header = "";
            let isValid = false;
            //build string of hexidecimal values
            for (let index = 0; index < arr.length; index++) {
                //convert to hexidecimal string
                header += arr[index].toString(16);
            }

            //check for patterns here each stands for a different file type
            switch (header) {
                case "89504e47":
                  isValid = true;
                  break;
                case "ffd8ffe0":
                case "ffd8ffe1":
                case "ffd8ffe2":
                case "ffd8ffe3":
                case "ffd8ffe8":
                  isValid = true;
                  break;
                default:
                  isValid = false; // Or you can use the blob.type as fallback
                  break;
            }
            if(isValid) {
                //emit new value
                observer.next(null);
            } else {
                //error message
                observer.next({invalidMimeType: true});
            }
            //end observable
            observer.complete();
        });
        //allows access to mime-type
        fileReader.readAsArrayBuffer(file);
    });
    return fileReaderObservable;
};


