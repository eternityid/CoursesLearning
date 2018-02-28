import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Course } from '../../shared/course';
import { CourseService } from '../../shared/course.service';
import { MatTableDataSource, MatSort, MatFormFieldControl,MatDialog } from '@angular/material';
import { CourseDetailComponent } from '../course-detail/course-detail.component';


@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent {


  coursesList = new MatTableDataSource();
  displayedColumns = ['teacherName', 'description', 'currentStudents', 'amountOfStudents', 'beginingOfDate', 'actionBtns'];

  constructor(private courseSvc: CourseService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.courseSvc.getCourses().subscribe(c => {
      this.coursesList.data = c;
    });    
  }

  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.coursesList.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.coursesList.filter = filterValue;
  }

  showModalCreate():void{
    let course:Course = {};
    let dialogRef = this.dialog.open(CourseDetailComponent, {
      width: '85%',
      data: course
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        this.courseSvc.addCourse(result);
      }
    });
  }

  showModalEdit(course:Course):void {
    let dialogRef = this.dialog.open(CourseDetailComponent, {
      width: '85%',
      data: course
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        this.courseSvc.updateCourse(result);
      }      
    });
  }

  deleteCourse(id: string) {
    this.courseSvc.deleteCourse(id);
  }

  mockcourse: any = { id: 161, teacherName: 'Leeanne Calles', description: 'Food Science', amountOfStudents: '20' };
}