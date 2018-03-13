import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Course } from '../../shared/course';

@Component({
  selector: 'app-warning-recommended-course',
  templateUrl: './warning-recommended-course.component.html',
  styleUrls: ['./warning-recommended-course.component.scss']
})
export class WarningRecommendedCourseComponent implements OnInit {

  course: Course;
  constructor(public _dialogRef: MatDialogRef<WarningRecommendedCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course) {
    this.course = Object.assign({}, data);
  }

  ngOnInit() {

  }

  onCloseClick(): void {
    this._dialogRef.close();
  }
}
