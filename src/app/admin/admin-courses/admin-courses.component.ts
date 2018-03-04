import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, Input  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Course } from '../../shared/course';
import { CourseService } from '../../shared/course.service';
import { MatTableDataSource, MatSort, MatFormFieldControl, MatDialog, MatAutocompleteSelectedEvent } from '@angular/material';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import {Category} from '../../shared/category';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import 'rxjs/add/operator/do';


@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit {

  coursesList = new MatTableDataSource();
  displayedColumns = ['teacherName', 'description', 'categories', 'amountOfStudents', 'beginingOfDate', 'actionBtns'];
  options = [
    {key: 'steak-0', name: 'Steak'},
    {key: 'pizza-1', name: 'Pizza'},
    {key: 'tacos-2', name: 'Tacos 1'},
    {key: 'tacos-3', name: 'Tacos 2'},
    {key: 'tacos-4', name: 'Tacos 3'},
    {key: 'tacos-5', name: 'Tacos 4'},
    {key: 'tacos-6', name: 'Tacos 5'}
  ];
  filteredOptions: Observable<Category[]>;
  myControl: FormControl = new FormControl();

  constructor(private courseSvc: CourseService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getSourceCourses();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Category>(''),        
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filterCategories(name) : this.options.slice())
      );
  }

  filterCategories(name: string): Category[] {
    return this.options.filter(option =>
      option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(category?: Category): string | undefined {
    return category ? category.name : undefined;
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
  }

  getSourceCourses(){
    this.courseSvc.getCourses().subscribe(c => {
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