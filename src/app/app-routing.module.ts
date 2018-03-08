import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found-component';

import { AuthGuard } from './shared/auth-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/learning', pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'learning',
    loadChildren: 'app/normal-screen/normal-screen.module#NormalScreenModule'
  },
  { path: 'sign-up', component: SignUpComponent },
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
