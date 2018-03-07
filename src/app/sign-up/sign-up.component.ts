import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  username:string;
  password:string;
  passwordRepeat:string;

  constructor() { }

  ngOnInit() {
  }

  onSignUp(password){
    if(password === this.passwordRepeat){
      console.log("That's right!!");
    }
    
  }

}
