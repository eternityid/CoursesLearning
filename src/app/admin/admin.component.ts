import { Component, OnInit, ViewChild } from '@angular/core';
import {Course} from '../shared/course';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  coursesList:Course[];
  check=true;
  // ssourceCourses:any;
  asideMenu=['Dashboard','Courses','News'];
  constructor() { }

  // @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {  
    
    //this.sourceCourses = new MatTableDataSource(this.coursesList);
  }

  ngAfterViewInit() {
    // this.sourceCourses.sort = this.sort;
  }

}
