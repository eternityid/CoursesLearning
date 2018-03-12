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

  sessions:Session[];
  Recommendedcourses:Course[];
  constructor(private _sessionSvc:SessionService,
    private _courseSvc:CourseService,
    public _dialogRef: MatDialogRef<JoinCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.getSessions();
  }

  getCourses(){
    this._courseSvc.getCourses().subscribe(courses =>{
      this.Recommendedcourses = courses.filter(course => this.data.indexOf(course.key) > -1);
    })
  }

  getSessions(){
    this._sessionSvc.getSessionsBasedCourse(this.data).subscribe(sessions =>{
      this.sessions = sessions;
    })
  }


  onCloseClick(): void {
    this._dialogRef.close();
  }
}
