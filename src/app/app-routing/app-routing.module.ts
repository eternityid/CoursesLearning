import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from '../page-not-found-component';
import { HomeComponent } from '../home/home.component';

import { AuthGuard } from '../shared/auth-guard.service';
import { CoursesComponent } from '../courses/courses.component';
import { FooterComponent } from '../footer/footer.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  { path: 'home', component: HomeComponent },
  {path: 'footer', component: FooterComponent},
  { path: 'courses', component: CoursesComponent },  
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
