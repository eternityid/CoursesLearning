import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import {
  Router,
  NavigationExtras
} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn: boolean;
  constructor(private userSvc: UserService,
    private router: Router) {
    this.isLoggedIn = this.userSvc.isLoggedIn;
  }

  logout() {
    this.userSvc.logout();
    this.router.navigate(['/login']);
  }
}
