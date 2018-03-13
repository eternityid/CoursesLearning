import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/do';

@Injectable()
export class UserService {

  private _tokenKey: string = "accessToken";
  isLoggedIn = false;
  userInfo:User;
  redirectUrl: string;
  recommendCourses = new Array<string>();


  constructor(private _firestore: AngularFirestore) {}

  login(user: any): Observable<boolean> {
    const currentTime = (new Date).getTime();
    return this._firestore.collection<User>('users', ref => ref.where('username', "==", user.username).limit(1)).valueChanges()
      .map(users => {
        if (users.length == 1 && users[0].password === user.password) {
          let jwtToken = { expire: currentTime, token: this.generateToken(), username: users[0].username };
          this.store(jwtToken);
          this.userInfo = users[0];
          this.isLoggedIn = true;
          return true;
        }
        this.isLoggedIn = false;
        return false;
      });
  }

  store(jwtToken: Object) {
    localStorage.setItem(this._tokenKey, JSON.stringify(jwtToken));
  }

  retrieve() {
    let storedToken: string = localStorage.getItem(this._tokenKey);
    if (!storedToken) throw 'no token found';
    return storedToken;
  }

  addUser(user: User) {
    user.token = this.generateToken();
    user.expire = (new Date()).getTime() + 300;

    this.store(JSON.stringify({
      expire: user.expire,
      token: user.token
    }));

    this.isLoggedIn = true;
    this._firestore.collection<User>('users').add(user);
  }

  addCourse(){
    console.log(this.userInfo);
    return this.userInfo
  }

  logout() {
    localStorage.removeItem(this._tokenKey);
    this.isLoggedIn = false;
    this.userInfo = undefined;
    this.recommendCourses = new Array<string>();
  }

  generateToken() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

}
