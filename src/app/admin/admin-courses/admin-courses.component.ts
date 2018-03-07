import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, Input  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Course } from '../../shared/course';
import { CourseService } from '../../shared/course.service';
import { MatTableDataSource, MatSort, MatFormFieldControl, MatDialog, MatSelectChange } from '@angular/material';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import {Category} from '../../shared/category';
import {CategoryService} from '../../shared/category.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {

  coursesList = new MatTableDataSource();
  displayedColumns = ['teacherName', 'description', 'categories', 'amountOfStudents', 'beginingOfDate', 'actionBtns'];

  categories:Category[];
  selectedDefault:string;

  constructor(private courseSvc: CourseService,
    private categorySvc:CategoryService,
    private dialog: MatDialog) {}

  ngOnInit() {
    this.selectedDefault = "000000000000001";
    this.getSourceCourses();
    this.getCategories();
  }

  getCategories() {
    this.categorySvc.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSelectionChanged(event: MatSelectChange) {
     let categoryId = event.value;
     this.getSourceCourses(categoryId);
  }

  getSourceCourses(categoryId?:string){
    this.courseSvc.getCourses(categoryId).subscribe(c => {
      this.coursesList.data = c;
    });
  }

  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.coursesList.sort = this.sort;
    this.getSourceCourses();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.coursesList.filter = filterValue;
  }

  showModalCreate(): void {
    let course: Course = {};
    let dialogRef = this.dialog.open(CourseDetailComponent, {
      width: '85%',
      maxHeight: '90%',      
      data: course
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.courseSvc.addCourse(result);
      }
    });
  }

  showModalEdit(course: Course): void {
    let dialogRef = this.dialog.open(CourseDetailComponent, {
      width: '85%',
      data: course
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.courseSvc.updateCourse(result);
      }
    });
  }

  deleteCourse(id: string) {

    let dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '50%'    
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)      
      if (result) {
        // this.courseSvc.deleteCourse(id);
      }
    });
  }

  mockcourse: any = { id: 161, teacherName: 'Leeanne Calles', description: 'Food Science', amountOfStudents: '20' };
}