import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NormalScreenComponent } from './normal-screen.component';
import { HomeComponent } from '../home/home.component';
import { CoursesComponent } from '../courses/courses.component';
import { AboutUsComponent } from '../about-us/about-us.component';


const normalRoutes: Routes = [
    {
        path: '',
        component: NormalScreenComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'courses', component: CoursesComponent },
            { path: 'about-us', component: AboutUsComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(normalRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class NormalScreenRoutingModule { }