import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Category } from '../shared/category';
import {CategoryService} from '../shared/category.service';
import {Course} from '../shared/course';
import {CourseService} from '../shared/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  countCourses:number;
  courses:Course[];
  filterCourses:Course[];
  filteredOptions: Observable<Category[]>;
  myControl: FormControl = new FormControl();

  constructor(private categorySvc:CategoryService,
    private courseSvc:CourseService){}

  ngOnInit() {
    this.getCategories();
    this.getCourses();
  }

  filterCategories(name: string,categories:Category[]): Category[] {
    return categories.filter(category =>
      category.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(category?: Category): string | undefined {
    return category ? category.name : undefined;
  }

  getCategories() {
    this.categorySvc.getCategories().subscribe(categories => {
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Category>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filterCategories(name,categories) : categories.slice())
      );     
    });
  }

  getCourses(){
    this.courseSvc.getCourses().subscribe(courses => {
      this.courses = courses;
      this.countCourses = courses.length;
      this.assignCopy();
    });
  }

  joinCourse(){
    console.log("courses component 56:59")
  }

  onKeySearch(event:any){    
    let keyword = event.target.value;
    this.assignCopy();
    if(keyword !== ''){
      this.filterCourses = this.courses.filter(course => course.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1);      
    }
    this.countCourses = this.filterCourses.length;
  }

  assignCopy(){
    this.filterCourses = Object.assign([], this.courses);
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

  }, {
    "imageUrl": "assets/img/logo3.jpg",
    "name": "Skin Care",
    "description": "Get an introduction to the hidden history, culture and people of the North East of England."

  }, {
    "imageUrl": "assets/img/logo4.jpg",
    "name": "Food as Medicine",
    "description": "Explore the role of food in health. Apply nutrition science to guide you on using food as medicine for you and your family."

  },
  {
    "imageUrl": "assets/img/logo5.jpg",
    "name": "Global Geordies: The North East of England and the World",
    "description": "Get an introduction to the hidden history, culture and people of the North East of England."

  },
  {
    "imageUrl": "assets/img/logo6.jpg",
    "name": "Precalculus: the Mathematics of Numbers, Functions and Equations",
    "description": "Get an introduction to the essential mathematical knowledge and skills required to take a first course in calculus."

  },
  {
    "imageUrl": "assets/img/logo7.jpg",
    "name": "Skin Care",
    "description": "Get an introduction to the hidden history, culture and people of the North East of England."

  },
  {
    "imageUrl": "assets/img/logo8.jpg",
    "name": "Skin Care",
    "description": "Get an introduction to the hidden history, culture and people of the North East of England."

  },
  {
    "imageUrl": "assets/img/logo9.jpg",
    "name": "Skin Care",
    "description": "Get an introduction to the hidden history, culture and people of the North East of England."
  },
  {
    "imageUrl": "assets/img/logo10.jpg",
    "name": "Skin Care",
    "description": "Get an introduction to the hidden history, culture and people of the North East of England."

  },
  {
    "imageUrl": "assets/img/logo11.jpg",
    "name": "Skin Care",
    "description": "Get an introduction to the hidden history, culture and people of the North East of England."
  }];

}
