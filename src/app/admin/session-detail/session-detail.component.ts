import { Component, OnInit, Inject } from '@angular/core';
import { Course } from '../../shared/course';
import { CourseService } from '../../shared/course.service';
import { MatSelectChange, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TeacherService } from '../../shared/teacher.service';
import { Teacher } from '../../shared/teacher';
import { Session } from '../../shared/session';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnInit {

  title = this.sessionSource ? "EDIT SESSION" : "CREATE NEW SESSION";
  courses: Course[];
  teachers: Teacher[];
  session: Session = {};
  constructor(private _courseSvc: CourseService,
    private _teacherSvc: TeacherService,
    public _dialogRef: MatDialogRef<SessionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public sessionSource: Session) {
    if (sessionSource) {
      this.session = Object.assign({}, sessionSource);
    }
  }

  ngOnInit() {
    this.getCourses();
    this.getTeachers();
  }

  getCourses() {
    this._courseSvc.getCourses().subscribe(courses => {
      this.courses = courses;
    })
  }

  getTeachers() {
    this._teacherSvc.getTeachersList().subscribe(teachers => {
      this.teachers = teachers;
    })
  }

  onCourseChanged(event: MatSelectChange) {
    this.session.id = (new Date()).getTime().toString();
  }

  compareFn(option1: any, option2: any): boolean {
    return option1 && option2 ? (option1.key === option2.key) : (option1 === option2);
  }

  onCancelClick(): void {
    this._dialogRef.close();
  }
}
