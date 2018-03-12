import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../../shared/course';
import { UserService } from '../../../shared/user.service';
import { Router } from '@angular/router';
import { JoinCourseComponent } from '../../join-course/join-course.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course: Course;
  constructor(private _userSvc: UserService,
    private _router: Router,
    private _dialog: MatDialog, ) { }

  ngOnInit() {
  }

  joinCourse() {
    if (!this._userSvc.isLoggedIn) {
      this._router.navigate(['/login']);
    } else {
      let passedCourses = this._userSvc.userInfo.passedCourses;
      if (passedCourses) {
        let orderList = this.course.orderList;
        let i = 0;
        let recommendCourses = orderList.filter(courseId => {
          if (passedCourses.indexOf(courseId) > -1) {
            i++;
            return true;
          }
          return false;
        })

        if (orderList.length > i) {
          console.log(recommendCourses);
          // this.showRecommendedCoursesModal(recommendCourses);
        } else {

        }

      }
    }
  }

  showRecommendedCoursesModal(recommendCourses: string[]) {
    let _dialogRef = this._dialog.open(JoinCourseComponent, {
      width: '50%',
      data: recommendCourses
    });
  }

  showJoinCourseModal() {
    let _dialogRef = this._dialog.open(JoinCourseComponent, {
      width: '50%'
    });

    _dialogRef.afterClosed().subscribe(infoStudent => {

    });
  }
}
