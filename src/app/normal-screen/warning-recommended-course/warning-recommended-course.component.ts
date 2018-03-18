import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Course } from '../../shared/course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning-recommended-course',
  templateUrl: './warning-recommended-course.component.html',
  styleUrls: ['./warning-recommended-course.component.scss']
})
export class WarningRecommendedCourseComponent implements OnInit {

  course: Course;
  constructor(private _router: Router,
    public _dialogRef: MatDialogRef<WarningRecommendedCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course) {
    this.course = Object.assign({}, data);
  }

  ngOnInit() {
  }

  goToDetail(courseKey: string) {
    let path = `learning/courses/detail/${courseKey}`;
    console.log(path);
    
    this._router.navigate([path]);
  }

  onCloseClick(): void {
    this._dialogRef.close();
  }
}
