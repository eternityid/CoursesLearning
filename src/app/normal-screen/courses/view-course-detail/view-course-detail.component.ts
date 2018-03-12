import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-course-detail',
  templateUrl: './view-course-detail.component.html',
  styleUrls: ['./view-course-detail.component.scss']
})
export class ViewCourseDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  e = [{
    "imageUrl": "assets/img/logo0.jpg",
    "name": "Food as Medicine",
    "description": "Get an introduction to the hidden history, culture and people of the North East of England."

  }, {
    "imageUrl": "assets/img/logo1.jpg",
    "name": "Skin Care",
    "description": "Get an introduction to the hidden history, culture and people of the North East of England."

  }, {
    "imageUrl": "assets/img/logo2.jpg",
    "name": "Skin Care",
    "description": "Get an introduction to the hidden history, culture and people of the North East of England."

  }];

}
