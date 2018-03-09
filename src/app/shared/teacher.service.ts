import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Teacher } from './teacher';

@Injectable()
export class TeacherService {

  constructor(private _firestore: AngularFirestore) { }

  getTeachersList(){
    return this._firestore.collection('teachers').snapshotChanges().map(teachers =>{      
      return teachers.map(teacher =>{
        const data = teacher.payload.doc.data() as Teacher;
        data.key = teacher.payload.doc.id;      
        return data;
      })
    })
  }

  addNewTeacher(teacherName:string){
    return this._firestore.collection('teachers').add({name:teacherName});    
  }
}
