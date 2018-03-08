import { Component, OnInit, ViewChild } from '@angular/core';
import {Course} from '../shared/course';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  coursesList:Course[];
  check=true;

  asideMenu=['Dashboard','Courses','News'];
  constructor() { }

  ngOnInit() {  
  }
}
