import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SessionService } from '../../shared/session.service';
import { Session } from '../../shared/session';
import { CourseService } from '../../shared/course.service';
import { Course } from '../../shared/course';


@Component({
  selector: 'app-join-course',
  templateUrl: './join-course.component.html',
  styleUrls: ['./join-course.component.scss']
})
export class JoinCourseComponent implements OnInit {

  course:Course;
  sessions:Session[];
  selectedSession:Session;
  constructor(private _sessionSvc:SessionService,
    private _courseSvc:CourseService,
    public _dialogRef: MatDialogRef<JoinCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course) { 
      this.course = Object.assign({},data);
    }

  ngOnInit() {
    this.getSessions(this.course);
  }

  getSessions(course:Course){    
    this._sessionSvc.getSessionsBasedCourse(course).subscribe(sessions =>{
      this.sessions = sessions;
    })
  }

  onCloseClick(): void {
    this._dialogRef.close();
  }
}
