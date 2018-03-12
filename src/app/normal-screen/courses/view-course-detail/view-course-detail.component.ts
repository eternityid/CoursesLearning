import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material';

@Component({
  selector: 'app-view-course-detail',
  templateUrl: './view-course-detail.component.html',
  styleUrls: ['./view-course-detail.component.scss']
})
export class ViewCourseDetailComponent implements OnInit {

  
  desserts = [
    {number: '001', teacher_name: 'abc', quanlity: '6', time: '24', join: '4'},
    {number: '002', teacher_name: 'acb', quanlity: '9', time: '37', join: '4'},
    {number: '003', teacher_name: 'bca', quanlity: '16', time: '24', join: '6'},
    {number: '004', teacher_name: 'adc', quanlity: '4', time: '67', join: '4'},
    {number: '005', teacher_name: 'cds', quanlity: '16', time: '49', join: '4'},
  ];

  sortedData;

  constructor() {
    this.sortedData = this.desserts.slice();
  }

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

  },{
    "imageUrl": "assets/img/logo1.jpg",
    "name": "Skin Care",
    "description": "Get an introduction to the hidden history, culture and people of the North East of England."

  }, {
    "imageUrl": "assets/img/logo2.jpg",
    "name": "Skin Care",
    "description": "Get an introduction to the hidden history, culture and people of the North East of England."

  }];



 
  sortData(sort: Sort) {
    const data = this.desserts.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'number': return compare(+a.number, +b.number, isAsc);
        case 'teacher_name': return compare(a.teacher_name, b.teacher_name, isAsc);
        case 'quanlity': return compare(+a.quanlity, +b.quanlity, isAsc);
        case 'time': return compare(+a.time, +b.time, isAsc);

        default: return 0;
      }
    });
  }

  courses = [
    {
      name: 'Pathways to Property: What is Real Estate?',
   
    },
    {
      name: 'Pathways to Property: What is Real Estate?',

    },
    {
      name: 'Pathways to Property: What is Real Estate?',

    }
  ];


}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
