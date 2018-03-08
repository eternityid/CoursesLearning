import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NormalScreenRoutingModule } from './normal-screen-routing.module';

import { NormalScreenComponent } from './normal-screen.component';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { CoursesComponent } from '../courses/courses.component';
import { MatButtonModule,
   MatToolbarModule, 
   MatGridListModule,
   MatListModule,
   MatDividerModule,
   MatCardModule,
   MatFormFieldModule,
   MatSlideToggleModule,
   MatSelectModule,
   MatIconModule,
   MatAutocompleteModule,
   MatInputModule,
   MatMenuModule} from '@angular/material';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { FooterComponent } from '../footer/footer.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { CourseCardComponent } from '../courses/course-card/course-card.component';
import { ViewCourseDetailComponent } from '../courses/view-course-detail/view-course-detail.component';



@NgModule({
  imports: [
    CommonModule,
    NormalScreenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatAutocompleteModule,
    Ng2CarouselamosModule ,
  ],
  declarations: [
    NormalScreenComponent,    
    HeaderComponent,
    HomeComponent,
    CoursesComponent,
    AboutUsComponent,
    FooterComponent,
    CourseCardComponent,
    ViewCourseDetailComponent
  ]
})
export class NormalScreenModule { }
