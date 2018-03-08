import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import {
  Router,
  NavigationExtras
} from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private _userSvc:UserService,private _router:Router) { }

  ngOnInit() {
  }

  logout(){
    this._userSvc.logout();
    this._router.navigate(['/']);
  }

}
