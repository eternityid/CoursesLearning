import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Course } from './course';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CourseService {

  private coursesUrl = 'api/courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl);
  }

  getCourse(id: number): Observable<Course> {
    const url = `${this.coursesUrl}/${id}`;
    return this.http.get<Course>(url);
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.coursesUrl, course, httpOptions);
  }

  updateHero(course: Course): Observable<any> {
    return this.http.put(this.coursesUrl, course, httpOptions);
  }

  deleteHero(courseId: number): Observable<Course> {
    const url = `${this.coursesUrl}/${courseId}`;
    return this.http.delete<Course>(url, httpOptions);
  }

  searchHeroes(term: string): Observable<Course[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Course[]>(`api/heroes/?name=${term}`);
  }
}
