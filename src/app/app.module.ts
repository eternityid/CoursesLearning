import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
         MatToolbarModule,
         MatGridListModule } from '@angular/material';

 import {MatListModule} from '@angular/material/list';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';

import { InMemoryDataService } from './shared/in-memory-data.service';
import { CourseService } from './shared/course.service';

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
    CoursesComponent
  ],
  imports: [
    Ng2CarouselamosModule ,
    BrowserModule,
    HttpClientModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
