import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
         MatToolbarModule,
         MatTableModule,
         MatSortModule,
         MatIconModule,
         MatGridListModule,
         MatFormFieldModule,
         MatInputModule,
         MatListModule,
         MatAutocompleteModule } from '@angular/material';


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

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


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
    AdminHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatGridListModule,
    MatAutocompleteModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
