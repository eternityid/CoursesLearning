import { Component, OnInit, ViewChild } from '@angular/core';
import {Course} from '../shared/course';
import {CourseService} from '../shared/course.service';
import { MatTableDataSource, MatSort, MatFormFieldControl } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  coursesList:Course[];
  // ssourceCourses:any;
  displayedColumns = ['id', 'teacherName', 'description', 'amountOfStudents', 'actionBtns'];
  constructor(private courseSvc:CourseService) { }

  // @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {  
    this.courseSvc.getCourses().subscribe(courses => {
      this.coursesList = courses;
    });
    //this.sourceCourses = new MatTableDataSource(this.coursesList);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    // this.coursesList.filter = filterValue;
  }
  
  ngAfterViewInit() {
    // this.sourceCourses.sort = this.sort;
  }

}
