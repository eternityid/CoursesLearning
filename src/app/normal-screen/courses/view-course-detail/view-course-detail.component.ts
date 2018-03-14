import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort, MatDialog } from '@angular/material';
import { UserService } from '../../../shared/user.service';
import { SessionService } from '../../../shared/session.service';
import { Session } from '../../../shared/session';
import { CourseService } from '../../../shared/course.service';
import { Course } from '../../../shared/course';
import { WarningRecommendedCourseComponent } from '../../warning-recommended-course/warning-recommended-course.component';

@Component({
  selector: 'app-view-course-detail',
  templateUrl: './view-course-detail.component.html',
  styleUrls: ['./view-course-detail.component.scss']
})
export class ViewCourseDetailComponent implements OnInit {

  courseId: string;
  course: Course;
  courses: Course[];
  orderList: string[];
  leftCourses: string[];
  recommendCourses: Course[];
  coursesByCategoryId: Course[];
  sessions: Session[];
  constructor(private _route: ActivatedRoute,
    private _courseSvc: CourseService,
    private _router: Router,
    private _userSvc: UserService,
    private _dialog: MatDialog,
    private _sessionSvc: SessionService) {
    this.courseId = this._route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getSessions(this.courseId);
    this.getCourseById(this.courseId);
    this.getCourses();
  }


  getCoursesByCategoryId(categoryId: string) {
    this._courseSvc.getCourses(categoryId).subscribe(courses => {
      console.log(this.course);
      
      this.coursesByCategoryId = courses.filter(course => course.key != this.course.key);
    })
  }

  getCourses() {
    this._courseSvc.getAllCourses().subscribe(courses => {
      this.recommendCourses = courses.filter(course => this.orderList.indexOf(course.key) > -1);
    })
  }

  getCourseById(id: string) {
    this._courseSvc.getCourseById(id).subscribe(course => {
      this.course = course;
      this.orderList = course.orderList;
      let categoryId = course.category.key;
      this.getCoursesByCategoryId(categoryId);
      
      if (this._userSvc.userInfo && this._userSvc.userInfo.passedCourses) {
        let passedCourses = this._userSvc.userInfo.passedCourses;
        this.leftCourses = course.orderList.filter(courseId => passedCourses.indexOf(courseId) == -1)
      }
    })
  }

  getSessions(courseId: string) {
    this._sessionSvc.getSessionsBasedCourseId(courseId).subscribe(sessions => {
      this.sessions = sessions;
    })
  }

  onJoinCourse(session: Session) {
    if (!this._userSvc.isLoggedIn) {
      this._router.navigate(['/login']);
    } else {
      let passedCourses = this._userSvc.userInfo.passedCourses;
      console.log(passedCourses);

      if (passedCourses) {
        this.leftCourses = this.orderList.filter(courseId => passedCourses.indexOf(courseId) == -1)
        console.log(this.leftCourses);

        if (this.leftCourses.length !== 0) {
          this.showRecommendedCoursesModal(this.course);
        } else {
          console.log(this.course);


        }
      }
    }
  }

  addUserJoinCourse() {

  }

  showRecommendedCoursesModal(course: Course) {
    let _dialogRef = this._dialog.open(WarningRecommendedCourseComponent, {
      width: '50%',
      data: course
    });
  }
}
