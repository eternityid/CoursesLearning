import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
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
  MAT_DATE_LOCALE
} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';

import { InMemoryDataService } from './shared/in-memory-data.service';
import { CourseService } from './shared/course.service';
import { AdminComponent } from './admin/admin.component';
import { CourseDetailComponent } from './admin/course-detail/course-detail.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminCoursesComponent } from './admin/admin-courses/admin-courses.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { UserService } from './shared/user.service';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    AboutUsComponent,
    HomeComponent,
    CoursesComponent,
    AdminComponent,
    CourseDetailComponent,
    DashboardComponent,
    AdminCoursesComponent,
    AdminHeaderComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    Ng2CarouselamosModule ,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastModule.forRoot(),
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    MatGridListModule,
    MatListModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  entryComponents:[CourseDetailComponent],
  providers: [CourseService,
    UserService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
