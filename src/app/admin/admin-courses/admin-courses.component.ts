import { Component, OnInit } from '@angular/core';
import { Course } from '../../shared/course';
import { CourseService } from '../../shared/course.service';
import { MatTableDataSource, MatSort, MatFormFieldControl } from '@angular/material';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit {

  coursesList: any;
  displayedColumns = ['id', 'teacherName', 'description', 'amountOfStudents', 'actionBtns'];

  constructor(private courseSvc: CourseService) { }

  ngOnInit() {
    this.courseSvc.getCourses().valueChanges().subscribe(courses => {
      this.coursesList = new MatTableDataSource(courses);
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();

  }

  showModal() {
    // this.courseSvc.testFirebase();
  }

  deleteCourse() {
    // this.courseSvc.testFirebase().valueChanges().subscribe(data => {
    //   console.log(data);
    // })

    // this.courseSvc.deleteCourse(id);
  }

  mockcourse: any = { id: 161, teacherName: 'Leeanne Calles', description: 'Food Science', amountOfStudents: '20' };
}