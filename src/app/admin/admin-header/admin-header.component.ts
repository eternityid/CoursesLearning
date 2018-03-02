import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import {
  Router,
  NavigationExtras
} from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private userSvc:UserService,private router:Router) { }

  ngOnInit() {
  }

  logout(){
    this.userSvc.logout();
    this.router.navigate(['/']);
  }

}
