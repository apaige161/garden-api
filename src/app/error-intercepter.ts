import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ErrorComponent } from "./error/error.component";

/**
 * 
 * global HTTP error interceptor
 * 
 * will pick up on any error message
 * 
 * this is a service kind of, added to the providers array in app.module
 */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    //inject service
    constructor(private dialog: MatDialog) {
            
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        //allow req to continue its journey
        return next.handle(req).pipe(
            //handle errors emitted in this stream
            catchError((error: HttpErrorResponse) => {
                //access error info here
                //console.log(error);
                //alert(error.error.message);

                let errorMessage = "An unknow error has occured";
                //replace default message with error message
                if (error.error.message) {
                    errorMessage = error.error.message;
                }

                //open the error component,
                //pass in data from here
                this.dialog.open(ErrorComponent, {data: {message: errorMessage}});

                //return an observable
                return throwError(error)
            })
        );
    }
}