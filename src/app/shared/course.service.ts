import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Course } from './course';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class CourseService {

  courses: Observable<Course[]>;
  constantCategoryDefault = "000000000000001";

  constructor(private _firestore: AngularFirestore,
  private _userSvc:UserService) {}

  getCourses(categoryId?:string): Observable<Course[]> {
    if(categoryId === undefined || categoryId === this.constantCategoryDefault){
      return this._firestore.collection('courses').snapshotChanges().map(actions => {
        if(this._userSvc.userInfo && this._userSvc.userInfo.passedCourses !== undefined && this._userSvc.userInfo.role !== "admin"){            
          let passedCoursesIdList = this._userSvc.userInfo.passedCourses;
          actions = actions.filter(act => passedCoursesIdList.indexOf(act.payload.doc.id))
        }
        return actions.map(act => {
          const data = act.payload.doc.data() as Course;
          data.key = act.payload.doc.id;
          return data;
        });
      });
    }
    return this._firestore.collection('courses',ref => ref.where('category.key', "==", categoryId)).snapshotChanges().map(actions => {      
      if(this._userSvc.userInfo && this._userSvc.userInfo.passedCourses !== undefined && this._userSvc.userInfo.role !== "admin"){
        let passedCoursesIdList = this._userSvc.userInfo.passedCourses;
        actions = actions.filter(act => passedCoursesIdList.indexOf(act.payload.doc.id))
      }
      return actions.map(act => {
        const data = act.payload.doc.data() as Course;
        data.key = act.payload.doc.id;
        return data;
      });
    });
  }

  addCourse(course: Course): void {
    this._firestore.collection('courses').add(course);
  }

  updateCourse(course: Course): void {
    this._firestore.doc(`courses/${course.key}`).update(course);
  }

  deleteCourse(courseId: string): void {
    this._firestore.doc(`courses/${courseId}`).delete();
  }
}