import { Component, OnInit } from '@angular/core';
import { CourseService } from './shared/course.service';
import { Course } from './shared/course';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  courses: Course[];

  constructor(private courseSvc: CourseService) { }

  ngOnInit() {
    this.courseSvc.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

}
