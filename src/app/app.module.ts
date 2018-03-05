import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule,
  MatTableModule,
  MatSortModule,
  MatIconModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatCardModule,
  MatDividerModule,

  MAT_DATE_LOCALE
} from '@angular/material';

import { AppComponent } from './app.component';

import { InMemoryDataService } from './shared/in-memory-data.service';
import { CourseService } from './shared/course.service';
import { PageNotFoundComponent } from './page-not-found-component';

import { UserService } from './shared/user.service';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import { AppRoutingModule } from './app-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { Router } from '@angular/router';
import { CategoryService } from './shared/category.service';
import { NormalScreenComponent } from './normal-screen/normal-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    PageNotFoundComponent,
  ],
  imports: [
    LoginRoutingModule,
    AppRoutingModule,
    Ng2CarouselamosModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastModule.forRoot(),
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    MatGridListModule,
    MatListModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [CourseService,
    CategoryService,
    UserService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router ){

    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
