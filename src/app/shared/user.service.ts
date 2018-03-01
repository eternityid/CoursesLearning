import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { User } from './user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private firestore:AngularFirestore) { }

  login(username:string){
    return this.firestore.collection<User>('users',ref => ref.where('username',"==",username).limit(1)).valueChanges();
  }

  addUser(){
    
  }

  logout(){

  }

}
