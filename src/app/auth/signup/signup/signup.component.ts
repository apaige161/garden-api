import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  private authStatusSub: Subscription;
  

  //inject auth service
  constructor(public authService: AuthService) { }

  ngOnInit() {
    //get authentication
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      //if this changes to false set isLoading
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onSignUp(form: NgForm) {
    //invalid check
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    //send new user data to service >> to backend for validation
    this.authService.createUser(form.value.email, form.value.password, form.value.nickname)
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }


}
