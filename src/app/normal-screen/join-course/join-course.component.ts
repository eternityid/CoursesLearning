import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SessionService } from '../../shared/session.service';
import { Session } from '../../shared/session';
import { CourseService } from '../../shared/course.service';
import { Course } from '../../shared/course';
import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-join-course',
  templateUrl: './join-course.component.html',
  styleUrls: ['./join-course.component.scss']
})
export class JoinCourseComponent implements OnInit {

  studyingCourse: boolean;
  course: Course;
  sessions: Session[];
  selectedSession: Session;
  constructor(private _sessionSvc: SessionService,
    private _userSvc: UserService,
    private _courseSvc: CourseService,
    public _dialogRef: MatDialogRef<JoinCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course) {
    this.course = Object.assign({}, data);
  }

  ngOnInit() {
    this.studyingCourse = this._userSvc.userInfo.studyingCourse?true:false;
    this.getSessions(this.course.key);
  }

  getSessions(courseId: string) {
    this._sessionSvc.getSessionsBasedCourseId(courseId).subscribe(sessions => {
      this.sessions = sessions;
    })
  }

  onSaveClick(selectedSession:Session){
    if(selectedSession){
      this._userSvc.addStudyingCourse(selectedSession);
      this.addRegistedStudent(selectedSession);
      this._dialogRef.close();
    }
    console.log("please choose!");
    
  }

  addRegistedStudent(session: Session) {
    let userKey = this._userSvc.userInfo.key;
    if (!session.registedStudents) {
      session.registedStudents = [];
    }
    session.registedStudents.push(userKey);

    this._sessionSvc.updateSession(session);
  }

  onCloseClick(): void {
    this._dialogRef.close();
  }
}
