import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared/course.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Course } from '../../shared/course';
import { CategoryService } from '../../shared/category.service';
import { Category } from '../../shared/category';
import { Session } from '../../shared/session';
import { SessionDetailComponent } from '../session-detail/session-detail.component';
import { SessionService } from '../../shared/session.service';

@Component({
  selector: 'app-admin-sessions',
  templateUrl: './admin-sessions.component.html',
  styleUrls: ['./admin-sessions.component.scss']
})
export class AdminSessionsComponent implements OnInit {

  sessions = new MatTableDataSource<Session>();
  categories: Category[];
  displayedColumns = ['id', 'course', 'teacher', 'registeredStudents', 'maxStudents', 'beginningDate', 'actionBtns'];
  constructor(private _courseSvc: CourseService,
    private _categorySvc: CategoryService,
    private _sessionSvc: SessionService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.getCategories();
    this.getSessions();
    this.getSourceCourses();
  }

  getCategories() {
    this._categorySvc.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  getSourceCourses(categoryId?: string) {
    this._courseSvc.getCourses(categoryId).subscribe(c => {

    });
  }

  getSessions() {
    this._sessionSvc.getSessions().subscribe(sessions => {
      this.sessions.data = sessions;
    })
  }

  showModalCreate() {
    let dialogRef = this._dialog.open(SessionDetailComponent, {
      width: '85%',
      maxHeight: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this._sessionSvc.addSession(result);
      }
    });
  }

  showModalEdit(session:Session){
    let dialogRef = this._dialog.open(SessionDetailComponent, {
      width: '85%',
      maxHeight: '90%',
      data: session
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this._sessionSvc.addSession(result);
      }
    });
  }
}
