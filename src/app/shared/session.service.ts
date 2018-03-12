import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from './user.service';
import { Session } from './session';
import { Course } from './course';

@Injectable()
export class SessionService {

  constantCategoryDefault = "000000000000001";
  constructor(private _firestore: AngularFirestore,
    private _userSvc:UserService) {}


  getSessions(categoryId?:string){
    if(categoryId === undefined || categoryId === this.constantCategoryDefault){
      return this._firestore.collection('sessions').snapshotChanges().map(actions => {     
        return actions.map(act => {
          const data = act.payload.doc.data() as Session;
          data.key = act.payload.doc.id;
          return data;
        });
      });
    }
    return this._firestore.collection('sessions',ref => ref.where('course.category.key', "==", categoryId)).snapshotChanges().map(actions => {     
      return actions.map(act => {
        const data = act.payload.doc.data() as Session;
        data.key = act.payload.doc.id;
        return data;
      });
    });
  }

  getSessionsBasedCourse(course:Course){
    return this._firestore.collection('sessions',ref => ref.where('course.key', "==", course.key)).snapshotChanges().map(actions => {     
      return actions.map(act => {
        const data = act.payload.doc.data() as Session;
        data.key = act.payload.doc.id;
        return data;
      });
    });
  }

  addSession(session:Session){
    this._firestore.collection('sessions').add(session);
  }

  updateSession(session:Session){
    this._firestore.doc(`sessions/${session.key}`).update(session);
  }

  deleteCourse(sessionId: string): void {
    this._firestore.doc(`sessions/${sessionId}`).delete();
  }

}
