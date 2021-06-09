import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { Main2Component } from './main2/main2.component';
import { GardensComponent } from './gardens/gardens.component';
import { IconSeedlingComponent } from './icon-seedling/icon-seedling.component';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from'@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { NgxPrintModule } from 'ngx-print';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';

import { FormsModule } from "@angular/forms";

import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-intercepter';

import { ErrorComponent } from './error/error.component';

import { AngularMaterialModule } from './angular-material.module'
import { PostsModule } from './posts/posts.module';

//services
//import { PostService } from './services/post.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent,
    Main2Component,
    IconSeedlingComponent,
    GardensComponent,
    FilterPipe,
    SortPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    PostsModule,
    NgxPrintModule,
    DragDropModule,
    MatProgressBarModule,
    MatSliderModule,
    MatTableModule,
    MatGridListModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  providers: 
    [
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},//tells angular to not overide but add in addition to
      {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ], 
  bootstrap: [AppComponent],
  //tells angular this component will get used even though angular cant see it
  entryComponents: [ErrorComponent],
})
export class AppModule { }
