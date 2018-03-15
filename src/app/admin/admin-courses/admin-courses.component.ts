import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Course } from '../../shared/course';
import { CourseService } from '../../shared/course.service';
import { MatTableDataSource, MatSort, MatFormFieldControl, MatDialog, MatSelectChange } from '@angular/material';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import { Category } from '../../shared/category';
import { CategoryService } from '../../shared/category.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {

  coursesList = new MatTableDataSource<Course>();
  sourceCourses: Course[];
  displayedColumns = ['name', 'categories', 'description', 'orderList', 'actionBtns'];

  categories: Category[];
  selectedDefault: string;

  constructor(private _courseSvc: CourseService,
    private _categorySvc: CategoryService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.selectedDefault = "000000000000001";
    this.getSourceCourses();
    this.getCategories();
  }

  getCategories() {
    this._categorySvc.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCategoryChanged(event: MatSelectChange) {
    let categoryId = event.value;
    this.getSourceCourses(categoryId);
  }

  getSourceCourses(categoryId?: string) {
    this._courseSvc.getCourses(categoryId).subscribe(c => {
      this.sourceCourses = c;
      this.coursesList.data = c;
    });
  }

  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.coursesList.sort = this.sort;
    this.getSourceCourses();
  }

  applyFilter(searchKeyword: string) {
    this.coursesList.data = this.sourceCourses;
    if (searchKeyword !== null) {
      this.coursesList.data = this.sourceCourses.filter((course) =>
        course.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1
      );
    }
  }

  showModalCreate(): void {
    let dialogRef = this._dialog.open(CourseDetailComponent, {
      width: '75%',
      maxHeight: '90%'
    });

    dialogRef.afterClosed().subscribe(newCourse => {
      let course = newCourse as Course;
      if (Object.keys(course).length >= 4){
        this._courseSvc.addCourse(newCourse);
      }
    });
  }

  showModalEdit(course: Course): void {
    let dialogRef = this._dialog.open(CourseDetailComponent, {
      width: '80%',
      maxHeight: '90%',
      data: course
    });

    dialogRef.afterClosed().subscribe(editedCourse => {
      if (editedCourse != null) {
        this._courseSvc.updateCourse(editedCourse);
      }
    });
  }

  deleteCourse(course: Course) {

    let dialogRef = this._dialog.open(ModalConfirmComponent, {
      width: '50%',
      maxHeight: '20%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        // this._courseSvc.deleteCourse(course.key);
      }
    });
  }
}