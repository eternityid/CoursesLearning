import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { AdminSessionsComponent } from './admin-sessions/admin-sessions.component';

import { AuthGuard } from '../shared/auth-guard.service';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent },
          { path: 'sessions', component: AdminSessionsComponent },
          { path: 'courses', component: AdminCoursesComponent }
        ]
      }

    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
