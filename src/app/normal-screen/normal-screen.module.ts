import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NormalScreenComponent } from './normal-screen.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseCardComponent } from './courses/course-card/course-card.component';
import { ViewCourseDetailComponent } from './courses/view-course-detail/view-course-detail.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FooterComponent } from './footer/footer.component';

import { NormalScreenRoutingModule } from './normal-screen-routing.module';

import { FilterTopListPipe } from '../shared/filter-top-list.pipe';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
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
   MatMenuModule,
   MatDialogModule,
   MatRadioModule, MatButtonToggleModule} from '@angular/material';
import { JoinCourseComponent } from './join-course/join-course.component';


@NgModule({
  imports: [
    CommonModule,
    NormalScreenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
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
    MatRadioModule,
    MatAutocompleteModule,
    Ng2CarouselamosModule ,
    MatButtonToggleModule,
  ],
  declarations: [
    NormalScreenComponent,    
    HeaderComponent,
    HomeComponent,
    CoursesComponent,
    AboutUsComponent,
    FooterComponent,
    CourseCardComponent,
    FilterTopListPipe,
    ViewCourseDetailComponent,
    JoinCourseComponent
  ],
  entryComponents:[JoinCourseComponent],
  exports:[FilterTopListPipe]
})
export class NormalScreenModule { }
