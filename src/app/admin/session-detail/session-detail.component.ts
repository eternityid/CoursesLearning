import { Component, OnInit } from '@angular/core';
import { Course } from '../../shared/course';
import { CourseService } from '../../shared/course.service';
import { MatSelectChange, MatDialogRef } from '@angular/material';
import { TeacherService } from '../../shared/teacher.service';
import { Teacher } from '../../shared/teacher';
import { Session } from '../../shared/session';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnInit {

  courses: Course[];
  sessionId:string = '';
  courseDefault: string = '';
  teachers:Teacher[];
  session:Session={};
  constructor(private _courseSvc: CourseService,
    private _teacherSvc:TeacherService,
    public _dialogRef: MatDialogRef<SessionDetailComponent>,) { }

  ngOnInit() {
    this.getCourses();
    this.getTeachers();
  }

  getCourses() {
    this._courseSvc.getCourses().subscribe(courses => {
      this.courses = courses;
    })
  }

  getTeachers(){
    this._teacherSvc.getTeachersList().subscribe(teachers =>{
      this.teachers = teachers;
    })
  }

  onCourseChanged(event:MatSelectChange){
    this.session.id = (new Date()).getTime().toString();
  }

  onCancelClick(): void {
    this._dialogRef.close();
  }
}
