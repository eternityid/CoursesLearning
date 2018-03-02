import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AdminRoutingModule }       from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';

import { MatToolbarModule,
   MatIconModule,
    MatButtonModule, 
    MatGridListModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatMenuModule,
    MatAutocompleteModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatMenuModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  entryComponents:[CourseDetailComponent],
  declarations: [
    AdminComponent,
    CourseDetailComponent,
    DashboardComponent,
    AdminHeaderComponent,
    AdminCoursesComponent,
    AdminNewsComponent,
  ],
  providers:[]
})
export class AdminModule { }
