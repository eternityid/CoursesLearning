import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared/course.service';
import { MatTableDataSource, MatDialog, MatSelectChange } from '@angular/material';
import { Course } from '../../shared/course';
import { CategoryService } from '../../shared/category.service';
import { Category } from '../../shared/category';
import { Session } from '../../shared/session';
import { SessionDetailComponent } from '../session-detail/session-detail.component';
import { SessionService } from '../../shared/session.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-admin-sessions',
  templateUrl: './admin-sessions.component.html',
  styleUrls: ['./admin-sessions.component.scss']
})
export class AdminSessionsComponent implements OnInit {

  sessions = new MatTableDataSource<Session>();
  sourceSessions: Session[];
  categoryDefault:string;
  categories: Category[];
  displayedColumns = ['id', 'course', 'teacher',  'beginningDate','during', 'registeredStudents', 'maxStudents','actionBtns'];
  constructor(private _courseSvc: CourseService,
    private _categorySvc: CategoryService,
    private _sessionSvc: SessionService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.categoryDefault = "000000000000001";
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

  getSessions(categoryId?: string) {
    this._sessionSvc.getSessions(categoryId).subscribe(sessions => {
      this.sourceSessions = sessions;
      this.sessions.data = sessions;
    })
  }

  onCategoryChanged(event: MatSelectChange) {
    let categoryId = event.value;
    this.getSessions(categoryId);
  }

  applyFilter(searchKeyword: string) {
    this.sessions.data = this.sourceSessions;
    if (searchKeyword !== null) {
      this.sessions.data = this.sourceSessions.filter((session) =>
        session.course.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1
      );
    }
  }

  showModalCreate() {
    let dialogRef = this._dialog.open(SessionDetailComponent, {
      width: '60%',
      maxHeight: '90%'
    });

    dialogRef.afterClosed().subscribe(newSession => {
      if (newSession != null) {
        this._sessionSvc.addSession(newSession);
      }
    });
  }

  showModalEdit(session: Session) {
    let dialogRef = this._dialog.open(SessionDetailComponent, {
      width: '60%',
      maxHeight: '90%',
      data: session
    });

    dialogRef.afterClosed().subscribe(editedSession => {
      if (editedSession != null) {
        this._sessionSvc.updateSession(editedSession);
      }
    });
  }

  deleteCourse(session:Session){
    let dialogRef = this._dialog.open(ModalConfirmComponent, {
      width: '50%',
      maxHeight: '20%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        // this._courseSvc.deleteCourse(course.key);
      }
    });
  }
}
