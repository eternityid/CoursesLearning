import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: Array<any> = []

  typesOfCources = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
    
  constructor() {
    this.items = [
      { name: 'assets/img/6.png' },
 
      { name: 'assets/img/7.png' },
      { name: 'assets/img/8.jpg' },
      
     
    ]
   }

  ngOnInit() {
  }

}