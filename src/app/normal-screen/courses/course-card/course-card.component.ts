import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../../shared/course';
import { UserService } from '../../../shared/user.service';
import { Router } from '@angular/router';
import { JoinCourseComponent } from '../../join-course/join-course.component';
import { MatDialog } from '@angular/material';
import { WarningRecommendedCourseComponent } from '../../warning-recommended-course/warning-recommended-course.component';
import { SessionService } from '../../../shared/session.service';
import { User } from '../../../shared/user';
import { Session } from '../../../shared/session';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course: Course;
  constructor(private _userSvc: UserService,
    private _router: Router,
    private _sessionSvc: SessionService,
    private _dialog: MatDialog) { }

  ngOnInit() {
  }

  joinCourse() {
    if (!this._userSvc.isLoggedIn) {
      this._router.navigate(['/login']);
    } else {
      let passedCourses = this._userSvc.userInfo.passedCourses;
      if (passedCourses) {
        let orderList = this.course.orderList;
        let recommendCourses = orderList.filter(courseId => passedCourses.indexOf(courseId) == -1)
        if (recommendCourses.length !== 0) {
          this._userSvc.recommendCourses = recommendCourses;
          this.showRecommendedCoursesModal(this.course);
        } else {
          this.showJoinCourseModal(this.course);
        }
      }
    }
  }

  showRecommendedCoursesModal(course: Course) {
    let _dialogRef = this._dialog.open(WarningRecommendedCourseComponent, {
      width: '50%',
      data: course
    });
  }

  showJoinCourseModal(course: Course) {
    let _dialogRef = this._dialog.open(JoinCourseComponent, {
      width: '80%',
      maxHeight: '90%',
      data: course
    });
  }
}
