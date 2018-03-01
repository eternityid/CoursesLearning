import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string = "";
  password:string = "";

  constructor(private userSvc: UserService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {}

  onLogin(username,password) {
    this.userSvc.login(username).subscribe(res => {
      if (res.length != 0) {
        if(res[0].password == password){
          this.toastr.success('You are awesome!', 'Success!');
        }else{
          this.toastr.error('Your password is wrong', 'Error!');
        }
      }else{
        this.toastr.error('Your password or username is wrong', 'Error!');
      }
    }, error => {
      this.toastr.error('No way', 'Error!');
    });
  }

}
