import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort, MatDialog } from '@angular/material';
import { UserService } from '../../../shared/user.service';
import { SessionService } from '../../../shared/session.service';
import { Session } from '../../../shared/session';
import { CourseService } from '../../../shared/course.service';
import { Course } from '../../../shared/course';
import { WarningRecommendedCourseComponent } from '../../warning-recommended-course/warning-recommended-course.component';
import { JoinCourseComponent } from '../../join-course/join-course.component';

@Component({
  selector: 'app-view-course-detail',
  templateUrl: './view-course-detail.component.html',
  styleUrls: ['./view-course-detail.component.scss']
})
export class ViewCourseDetailComponent implements OnInit {

  hideJoinBtn:boolean;
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
    if(this._userSvc.userInfo && this._userSvc.userInfo.studyingCourse){
      this.hideJoinBtn = true;
    }
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
      console.log(sessions);
      
    })
  }

  addUserInto(session:Session){
    if (!this._userSvc.isLoggedIn) {
      this._router.navigate(['/login']);
    } else {
      this._userSvc.addStudyingCourse(session);
      this.addRegistedStudent(session);
    }
  }
  addRegistedStudent(session: Session) {
    let userKey = this._userSvc.userInfo.key;
    if (!session.registedStudents) {
      session.registedStudents = [];
    }
    session.registedStudents.push(userKey);

    this._sessionSvc.updateSession(session);
  }

  joinCourse(course:Course) {
    if (!this._userSvc.isLoggedIn) {
      this._router.navigate(['/login']);
    } else {
      let passedCourses = this._userSvc.userInfo.passedCourses;
      if (passedCourses) {
        let orderList = course.orderList;
        let recommendCourses = orderList.filter(courseId => passedCourses.indexOf(courseId) == -1)
        if (recommendCourses.length !== 0) {
          this._userSvc.recommendCourses = recommendCourses;
          this.showRecommendedCoursesModal(course);
        } else {
          this.showJoinCourseModal(course);
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
