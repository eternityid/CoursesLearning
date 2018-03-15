import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
  Router,
  NavigationExtras
} from '@angular/router';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userInfo: {
    username: string,
    password: string
  }
  hide = true;

  constructor(private _userSvc: UserService,
    private _toastr: ToastsManager,
    private _vcr: ViewContainerRef,
    private _router: Router) {
    this._toastr.setRootViewContainerRef(_vcr);
  }

  ngOnInit() { }

  onLogin(username, password) {
    this.userInfo = { username: username, password: password };

    this._userSvc.login(this.userInfo).subscribe(() => {
      if (this._userSvc.isLoggedIn) {
        let redirect = this._userSvc.redirectUrl ? this._userSvc.redirectUrl : '/learning/courses';
        this._toastr.success('You are right and wait a minute!', 'Successful');
        this._router.navigate([redirect]);
      } else {
        this._toastr.error('Your username or password is wrong', 'Error');
      }
    });
  }



}
