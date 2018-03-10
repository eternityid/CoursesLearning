import { Component, OnInit,Input } from '@angular/core';
import {Course} from '../../../shared/course';
import {UserService} from '../../../shared/user.service';
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
      let passedCourses = this._userSvc.userInfo.passedCourses;
      if(passedCourses){
        let orderList = this.course.orderList;       
        let i = 0;
        let recommendCourses = orderList.filter(courseId => {
          if(passedCourses.indexOf(courseId) > -1){
            i++;
            return true;
          }
          return false;
        })
        console.log(passedCourses, this._userSvc.addCourse())
        if(orderList.length == i){
          passedCourses.push(this.course.key);
          console.log(passedCourses, this._userSvc.addCourse())  
        }
              
      }
    }
  }
}
