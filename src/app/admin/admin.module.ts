import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { AdminSessionsComponent } from './admin-sessions/admin-sessions.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { SessionDetailComponent } from './session-detail/session-detail.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FilterOrderListPipe } from '../shared/filter-order-list.pipe';

import {
  MatToolbarModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatDialogModule,
  MatDatepickerModule,
  MatTableModule,
  MatSortModule,
  MatInputModule,
  MatMenuModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    CourseDetailComponent,
    ModalConfirmComponent,
    CreateCategoryComponent,
    SessionDetailComponent,
    FileUploadComponent],
  declarations: [
    AdminComponent,
    CourseDetailComponent,
    DashboardComponent,
    AdminHeaderComponent,
    AdminCoursesComponent,
    ModalConfirmComponent,
    CreateCategoryComponent,
    AdminSessionsComponent,
    SessionDetailComponent,
    FileUploadComponent,
    FilterOrderListPipe
  ],
  exports:[FilterOrderListPipe],
  providers: []
})
export class AdminModule { }
