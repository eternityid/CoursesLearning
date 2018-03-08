import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
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

  isLoggedIn: boolean;
  constructor(private _userSvc: UserService,
    private _router: Router) {
    this.isLoggedIn = this._userSvc.isLoggedIn;
  }

  logout() {
    this._userSvc.logout();
    this._router.navigate(['/login']);
  }
}
