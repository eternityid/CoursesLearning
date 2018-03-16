import { Component } from '@angular/core';
import { UserService } from '../../shared/user.service';
import {
  Router,
  NavigationExtras
} from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  username:string;
  isLoggedIn: boolean;
  constructor(private _userSvc: UserService,
    private _router: Router) {
    this.isLoggedIn = this._userSvc.isLoggedIn;
    this.username = this._userSvc.userInfo?this._userSvc.userInfo.username.toUpperCase():'';
  }

  logout() {
    this._userSvc.logout();
    this._router.navigate(['/login']);
  }



}
