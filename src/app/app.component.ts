import { Component, OnInit } from '@angular/core';
import { CourseService } from './shared/course.service';
import { Course } from './shared/course';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private courseSvc: CourseService) { }

  ngOnInit() {
  }

}
