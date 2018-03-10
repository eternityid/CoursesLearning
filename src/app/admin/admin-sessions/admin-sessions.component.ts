import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared/course.service';
import { MatTableDataSource } from '@angular/material';
import { Course } from '../../shared/course';
import { CategoryService } from '../../shared/category.service';
import { Category } from '../../shared/category';

@Component({
  selector: 'app-admin-sessions',
  templateUrl: './admin-sessions.component.html',
  styleUrls: ['./admin-sessions.component.scss']
})
export class AdminSessionsComponent implements OnInit {

  sessions=new MatTableDataSource<Course>();
  categories:Category[];
  displayedColumns = ['id', 'course', 'beginningDate', 'comparedStudents', 'actionBtns'];
  constructor(private _courseSvc: CourseService,private _categorySvc: CategoryService) { }

  ngOnInit() {
    this.getCategories();
    this.getSourceCourses();
  }

  getCategories() {
    this._categorySvc.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  getSourceCourses(categoryId?: string) {
    this._courseSvc.getCourses(categoryId).subscribe(c => {
      this.sessions.data = c;
    });
  }
}
