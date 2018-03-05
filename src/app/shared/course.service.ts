import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Course } from './course';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CourseService {

  courses: Observable<Course[]>;
  constantCategoryDefault = "000000000000001";

  constructor(private firestore: AngularFirestore) {}

  getCourses(categoryId?:string): Observable<Course[]> {
    if(categoryId === undefined || categoryId === this.constantCategoryDefault){
      return this.firestore.collection('courses').snapshotChanges().map(actions => {
        return actions.map(act => {
          const data = act.payload.doc.data() as Course;
          data.key = act.payload.doc.id;
          return data;
        });
      });
    }
    return this.firestore.collection('courses',ref => ref.where('category.key', "==", categoryId)).snapshotChanges().map(actions => {
      return actions.map(act => {
        const data = act.payload.doc.data() as Course;
        data.key = act.payload.doc.id;
        return data;
      });
    });
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