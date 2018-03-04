import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  selectedValue: string;

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];



  e =[{
    "imageUrl":"assets/img/logo0.jpg",          
    "name":  "Food as Medicine",
    "description": "Get an introduction to the hidden history, culture and people of the North East of England."   
   
 },{
  "imageUrl":"assets/img/logo1.jpg",          
  "name":  "Skin Care",
  "description": "Get an introduction to the hidden history, culture and people of the North East of England."      
 
},{
  "imageUrl":"assets/img/logo2.jpg",          
  "name":  "Skin Care",
  "description": "Get an introduction to the hidden history, culture and people of the North East of England."      
 
},{
  "imageUrl":"assets/img/logo3.jpg",          
  "name":  "Skin Care",
  "description": "Get an introduction to the hidden history, culture and people of the North East of England."      
 
},{
  "imageUrl":"assets/img/logo4.jpg",          
  "name":  "Food as Medicine",
  "description": "Explore the role of food in health. Apply nutrition science to guide you on using food as medicine for you and your family."      
 
}, 
    {
    "imageUrl":"assets/img/logo5.jpg",          
    "name":  "Global Geordies: The North East of England and the World",
    "description": "Get an introduction to the hidden history, culture and people of the North East of England."      
   
 },
 {
  "imageUrl":"assets/img/logo6.jpg",          
  "name":  "Precalculus: the Mathematics of Numbers, Functions and Equations",
  "description": "Get an introduction to the essential mathematical knowledge and skills required to take a first course in calculus."      
 
},
{
  "imageUrl":"assets/img/logo7.jpg",          
  "name":  "Skin Care",
  "description": "Get an introduction to the hidden history, culture and people of the North East of England."      
 
},
{
  "imageUrl":"assets/img/logo8.jpg",          
  "name":  "Skin Care",
  "description": "Get an introduction to the hidden history, culture and people of the North East of England."      
 
},
{
  "imageUrl":"assets/img/logo9.jpg",          
  "name":  "Skin Care",   
  "description": "Get an introduction to the hidden history, culture and people of the North East of England."      
},
{
  "imageUrl":"assets/img/logo10.jpg",          
  "name":  "Skin Care",
  "description": "Get an introduction to the hidden history, culture and people of the North East of England."      
 
},
{      
  "imageUrl":"assets/img/logo11.jpg",          
  "name":  "Skin Care",
  "description": "Get an introduction to the hidden history, culture and people of the North East of England."      
 }];

  constructor() { }

  ngOnInit() {
  }

}
