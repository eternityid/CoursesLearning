import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, Input  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Course } from '../../shared/course';
import { CourseService } from '../../shared/course.service';
import { MatTableDataSource, MatSort, MatFormFieldControl, MatDialog, MatAutocompleteSelectedEvent } from '@angular/material';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import {Category} from '../../shared/category';
import {CategoryService} from '../../shared/category.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit {

  coursesList = new MatTableDataSource();
  displayedColumns = ['teacherName', 'description', 'categories', 'amountOfStudents', 'beginingOfDate', 'actionBtns'];

  constantCategory:Category = {
    key:'000000000001',
    name:'All'
  }
  filteredOptions: Observable<Category[]>;
  myControl: FormControl = new FormControl();

  constructor(private courseSvc: CourseService,
    private categorySvc:CategoryService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getSourceCourses();
    this.getCategories();
    this.myControl.setValue(this.constantCategory);
  }

  getCategories() {
    this.categorySvc.getCategories().subscribe(categories => {
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Category>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filterCategories(name,categories) : categories.slice())
      );     
    });
  }

  filterCategories(name: string,categories:Category[]): Category[] {
    return categories.filter(category =>
      category.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(category?: Category): string | undefined {
    return category ? category.name : undefined;
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    let temp = event.option.value as Category;
     let categoryId = temp.key;
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
    this.courseSvc.deleteCourse(id);
  }

  mockcourse: any = { id: 161, teacherName: 'Leeanne Calles', description: 'Food Science', amountOfStudents: '20' };
}