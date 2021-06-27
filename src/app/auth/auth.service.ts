


/********************************************************************************
 * 
 * saves user nickname on sign up but does not do anything with it on login
 * 
 * does not extract it
 * 
 * how can i extract user's nickname without using it to sign in?????
 * 
 *********************************************************************************/







import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './signup/auth-data.model';
import { SignupAuthData } from './signup/signup/auth-data-signup';

import { environment } from '../../environments/environment';
const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private isAuthenticated = false;
  private tokenTimer: any;
  private userId: string;
  public userEmail: string;
  public nickname: string;

  //will push authentication information to component
  //true or false is user authenticated
  private authStatusListener = new Subject<boolean>();
  

  constructor(private http: HttpClient, private router: Router) { }

  getAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getUserEmail() {
    return this.userEmail;
  }

  //only listen not emit
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  //send request to create new user
  createUser(email:string, password:string ) {
    //create new user using authdata model
    const authData: AuthData = { email: email, password: password }
    //send data to backend and subscribe to the response
    //configured to be aware of token 
    //the api will send back a response with a token field of type string
    return this.http.post<{token: string}>(BACKEND_URL + "signup", authData)
      .subscribe(() => {
        //success case
        this.router.navigate(["/auth/login"]);
      }, error => {
        //push logged out to entire app if failed
        this.authStatusListener.next(false);
        this.router.navigate(["/auth/signup"]);
      });
      
  }

  //send req to check email/pass and provide a jwt in resonse from the backend
  login(email: string, password: string) {
    //create temp new user using authdata model to verify credentials
    const authData: AuthData = { email: email, password: password }
    this.http.post<{token: string, expiresIn: number, userId: string, userEmail: string}>(BACKEND_URL + "login", authData)
      .subscribe(response => {
        //attach jwt
        //get token
        const responseToken = response.token;
        //assign token to property
        this.token = responseToken;

        if(responseToken) {
          //get duration from backend
          const expiresInDuration = response.expiresIn
          //set timer
          this.setAuthTimer(expiresInDuration)

          //extract userId from backend user route
          this.userId = response.userId;
          this.userEmail = response.userEmail;
          //this.nickname = response.nickname;

          //set auth
          this.isAuthenticated = true;
          //logged in
          this.authStatusListener.next(true);

          //save data to local storage
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(responseToken, expirationDate, this.userId, this.userEmail)
          //redirect user
          this.router.navigate(['/']);
        }
        //handle authentication errors
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  //log user in if information is in local storage
  autoAuthUser() {
    const authInformation = this.getAuthData();

    //auth info check
    if(!authInformation) {
      return;
    }
    //check if timed out
    const now = new Date();
    //true = can be authenticated
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    //still time left on expiration timer if above 0
    if(expiresIn > 0) {
      //get token from storage
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      //this.userEmail = authInformation.userEmail;

      //messures by seconds not milliseconds
      this.setAuthTimer(expiresIn / 1000);

      //push the new information
      this.authStatusListener.next(true);
    }
  }

  logout() {
    //delete token
    this.token = null;
    this.isAuthenticated = false;
    //push anew value to listener
    this.authStatusListener.next(false);
    //reset timer
    clearTimeout(this.tokenTimer);
    //reset userId
    this.userId = null;
    //reset userEmail
    this.userEmail = null;
    //reset nickname
    //this.userNickname = null;
    //clear local storage
    this.clearAuthData();
    //redirect user
    this.router.navigate(['/']);
  }

  /**
   * 
   * store data in local storage --not ideal but will work for now
   * 
   * save token, expiration, userId
   * 
   */
  private saveAuthData(token: string, expirationDate: Date, userId: string, userEmail: string) {
    localStorage.setItem('token', token);
    //stores properly formatted string that can be read
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('userEmail', userEmail);
  }

  //set timer in seconds
  private setAuthTimer(duration: number) {
    console.log("setting timer: " + duration);
    //after the duration the callback function will get executed
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('nickname');
  }

  //local storage check
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if(!token || !expirationDate) {
      return;
    }
    //return local storage data if found
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }

}
