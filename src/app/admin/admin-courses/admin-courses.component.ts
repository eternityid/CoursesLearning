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
  sourceCourses:Course[];
  displayedColumns = ['teacherName', 'description', 'categories', 'amountOfStudents', 'beginingOfDate', 'actionBtns'];

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

  onSelectionChanged(event: MatSelectChange) {
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
    if(searchKeyword === null){
      this.coursesList.data = this.sourceCourses;
    }
    this.coursesList.data = this.sourceCourses.filter((course) =>
      course.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1
    );
  }

  showModalCreate(): void {
    const coursesList = this.coursesList.data;
    let dialogRef = this._dialog.open(CourseDetailComponent, {
      width: '85%',
      maxHeight: '90%',
      data: coursesList
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this._courseSvc.addCourse(result);
      }
    });
  }

  showModalEdit(course: Course): void {
    const coursesList = this.coursesList.data.filter(c => c != course);
    const dataRequest = {
      course: course,
      coursesList: coursesList
    }
    let dialogRef = this._dialog.open(CourseDetailComponent, {
      width: '85%',
      data: dataRequest
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this._courseSvc.updateCourse(result);
      }
    });
  }

  deleteCourse(course: Course) {

    let dialogRef = this._dialog.open(ModalConfirmComponent, {
      width: '50%',
      maxHeight: '20%',
      data: course
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        // this._courseSvc.deleteCourse(course.key);
      }
    });
  }

  mockcourse: any = { id: 161, teacherName: 'Leeanne Calles', description: 'Food Science', amountOfStudents: '20' };
}