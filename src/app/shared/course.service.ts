import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Course } from './course';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CourseService {

  courses: Observable<Course[]>;

  constructor(private firestore: AngularFirestore) {
    this.courses = this.firestore.collection('courses').snapshotChanges().map(actions => {
      return actions.map(act => {
        const data = act.payload.doc.data() as Course;
        data.key = act.payload.doc.id;
        return data;
      });
    });
  }

  getCourses(): Observable<Course[]> {
    return this.courses;
  }

  addCourse(course: Course): void {
    this.firestore.collection('courses').add(course);
  }

  updateCourse(course: Course): void {
    this.firestore.doc(`courses/${course.key}`).update(course);
  }

  deleteCourse(courseId: string): void {
    this.firestore.doc(`courses/${courseId}`).delete();
  }
}