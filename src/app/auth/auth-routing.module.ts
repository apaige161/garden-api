import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login/login.component";
import { SignupComponent } from "./signup/signup/signup.component";

const routes: Routes = [
    //login
    { path: 'login', component: LoginComponent },
    //signup
    { path: 'signup', component: SignupComponent },
]

@NgModule({
    //set up routes
    imports: [
        //merge child routes
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})

export class AuthRoutingModule {}