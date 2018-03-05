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

  constructor(private userSvc: UserService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() { }

  onLogin(username, password) {
    this.userInfo = { username: username, password: password };

    this.userSvc.login(this.userInfo).subscribe(() => {
      if (this.userSvc.isLoggedIn) {
        let redirect = this.userSvc.redirectUrl ? this.userSvc.redirectUrl : '/admin';
        this.toastr.success('You are right and wait a minute!', 'Successful');
        this.router.navigate([redirect]);
      } else {
        this.toastr.error('Your username or password is wrong', 'Error');
      }
    });
  }



}
