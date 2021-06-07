import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

//create interceptor for jwt
//will call this for requests leaving the client side
/**
 * intercept a request leaving client side,
 * add authToken in the header
 * 
 * this is a service kind of, added to the providers array in app.module
 */

//works a lot like middleware but only for outgoing requests

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    //inject service
    constructor(private authService: AuthService) {
            
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        //get the token
        const authToken = this.authService.getToken(); 

        //mainpulate request to hold the token
        //clone request first
        const authRequest = req.clone({
            //add new headers
            //set should be the same name found in middleware/check-auth.js
            //will add the token
            headers: req.headers.set('Authorization', "Bearer " + authToken)
        });
        
        //allow req to continue its journey
        return next.handle(authRequest);
    }
}