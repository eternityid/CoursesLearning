import { Component, OnInit } from '@angular/core';
import { Category } from '../../shared/category';
import { CategoryService } from '../../shared/category.service';
import { Course } from '../../shared/course';
import { CourseService } from '../../shared/course.service';
import { UserService } from '../../shared/user.service';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  countCourses: number;
  courses: Course[];
  filterCourses: Course[];
  categories: Category[];
  selectedDefault: string;

  constructor(private _categorySvc: CategoryService,
    private _courseSvc: CourseService,
    private _userSvc: UserService) { }

  ngOnInit() {
    this.selectedDefault = "000000000000001";
    this.getCategories();
    this.getCourses();
  }


  getCategories() {
    this._categorySvc.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  getCourses(categoryId?: string) {
    this._courseSvc.getCourses(categoryId).subscribe(courses => {
      console.log("course component")
      this.courses = courses;
      this.countCourses = courses.length;
      this.assignCopy();
    });
  }

  onSelectionChanged(event: MatSelectChange) {
    let categoryId = event.value;
    this.getCourses(categoryId);
  }

  onKeySearch(event: any) {
    let keyword = event.target.value;
    this.assignCopy();
    if (keyword !== '') {
      this.filterCourses = this.courses.filter(course => course.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
    }
    this.countCourses = this.filterCourses.length;
  }

  assignCopy() {
    this.filterCourses = Object.assign([], this.courses);
  }
}
