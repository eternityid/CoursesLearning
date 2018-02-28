import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: Array<any> = []

  constructor() {
    this.items = [
      { name: 'assets/img/img1.png' },
      { name: 'assets/img/img2.png' },
      { name: 'assets/img/img3.png' },
     
    ]
   }

  ngOnInit() {
  }

}
