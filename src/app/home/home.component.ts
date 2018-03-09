import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../shared/teacher.service';
import { CourseService } from '../shared/course.service';
import { Course } from '../shared/course';
import { Teacher } from '../shared/teacher';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  teachersList: Teacher[];
  coursesList:Course[];
  items: Array<any> = []

  courses = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers', 'AAA AAA'];


  constructor(private _teacherSvc: TeacherService,
    private _courseSvc: CourseService) {
    this.items = [
      { name: 'assets/img/6.png' },
      { name: 'assets/img/7.png' },
      { name: 'assets/img/8.jpg' },
    ]
  }

  ngOnInit() {
    this.getCourses();
    this.getTeachers();
  }

  getCourses(){
    this._courseSvc.getCourses().subscribe(courses =>{
      this.coursesList = courses;
    })
  }

  getTeachers(){
    this._teacherSvc.getTeachersList().subscribe(teachers =>{
      this.teachersList = teachers;
    })
  }

}