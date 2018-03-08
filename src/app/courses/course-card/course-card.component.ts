import { Component, OnInit,Input } from '@angular/core';
import {Course} from '../../shared/course';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course:Course;
  constructor(private _userSvc:UserService,
  private _router:Router) { }

  ngOnInit() {
  }

  joinCourse(){
    if(!this._userSvc.isLoggedIn){
      this._router.navigate(['/login']);
    }else{
      let studiedCourses = this._userSvc.userInfo.studiedCourses;
      if(studiedCourses){
        let orderList = this.course.orderList;       
        let i = 0;
        let recommendCourses = orderList.filter(courseId => {
          if(studiedCourses.indexOf(courseId) > -1){
            i++;
            return true;
          }
          return false;
        })
        console.log(studiedCourses, this._userSvc.addCourse())
        if(orderList.length == i){
          studiedCourses.push(this.course.key);
          console.log(studiedCourses, this._userSvc.addCourse())  
        }
              
      }
    }
  }




}
