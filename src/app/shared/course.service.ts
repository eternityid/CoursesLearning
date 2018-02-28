import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from 'angularfire2/database';

import { Course } from './course';
import { Observable } from '@firebase/util';

@Injectable()
export class CourseService {

  //private coursesUrl = 'api/courses';
  private courseList = this.dbFirebase.list<Course[]>('courses');
  private courses = this.dbFirebase.object<Course[]>('courses');

  constructor(private http: HttpClient,
     private dbFirebase: AngularFireDatabase) { }

  getCourses(): AngularFireList<Course[]> {
    return this.courseList;
  }

  // getCourse(id: any): Observable<Course> {
  //   const url = `${this.coursesUrl}/${id}`;
  //   return this.http.get<Course>(url);
  // }

  addCourse(course: Course): void {
    const dataList = this.dbFirebase.list('/courses');
    dataList.push(course);
  }

  // updateCourse(course: Course): Observable<any> {
  //   return this.http.put(this.coursesUrl, course, httpOptions);
  // }

  deleteCourse(courseId: any): void {
    this.courseList.remove(courseId);
  }

  testFirebase(): AngularFireObject<Course[]> {
    return this.dbFirebase.object('/');
  }
}