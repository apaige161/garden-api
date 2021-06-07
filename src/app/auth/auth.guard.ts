

//protect routes on client side

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

//have to add this to inject services into services
@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private authService: AuthService, private router: Router){

    }

    //decides if a user can access a route or not
    //route user is trying to access is accessable if return true
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): boolean  | Observable<boolean> | Promise<boolean> {
        
            //authenticated or nah, returns a boolean
            const isAuth = this.authService.getAuth();

            //redirect to login page if not logged in
            if(!isAuth) {
                this.router.navigate(['auth/login']);
            }
            return isAuth;
    }


}