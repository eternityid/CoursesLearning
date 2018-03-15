import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSelectChange, MatOption } from '@angular/material';
import { Category } from '../../shared/category';
import { Course } from '../../shared/course';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CategoryService } from '../../shared/category.service';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { CreateCategoryComponent } from '../create-category/create-category.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { CourseService } from '../../shared/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  title = this.data ? "EDIT COURSE" : "CREATE NEW COURSE";
  titleCreateCategory = "CREATE NEW CATEGORY";
  newCategoryName: string;
  course: Course;
  coursesList: Course[];
  categories: Category[];
  orderListDefault: string[];
  categoryDefault: string = '';
  formControlOrderList = new FormControl;

  constructor(
    private _categorySvc: CategoryService,
    private _courseSvc:CourseService,
    private _toastr: ToastsManager,
    private _firebaseApp: FirebaseApp,
    private _vcr: ViewContainerRef,
    private _dialog: MatDialog,
    public _dialogRef: MatDialogRef<CourseDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course
  ) {
    if (data) {
      this.course = Object.assign({}, data);
      this.categoryDefault = this.course.category.key;
      this.formControlOrderList.setValue(this.course.orderList);
    } else {
      this.course = {};

    }
    this._toastr.setRootViewContainerRef(_vcr);
  }

  ngOnInit() {
    this.getCourses();
    this.getCategories();
  }

  getCourses(){
    this._courseSvc.getAllCourses().subscribe(courses => {
      this.coursesList = courses.filter(course => course.key !== this.course.key);      
    })
  }

  getCategories() {
    this._categorySvc.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  showCreateCategoryModal() {
    let _dialogRef = this._dialog.open(CreateCategoryComponent, {
      width: '50%',
      data: this.titleCreateCategory
    });

    _dialogRef.afterClosed().subscribe(newCategoryName => {
      if (newCategoryName !== null && newCategoryName !== '' && newCategoryName !== undefined) {
        this._categorySvc.addCategory(newCategoryName).then(category => {
          this.categoryDefault = category.id;
          this.course.category = {
            key: category.id,
            name: newCategoryName
          }
          this._toastr.success("New category is created successful!", "Success");
        });
      }
    });
  }

  showUploadImageyModal(){
    let _dialogRef = this._dialog.open(FileUploadComponent, {
      width: '50%'      
    });

    _dialogRef.afterClosed().subscribe(newImageUrl => {
      if(newImageUrl){
        this.course.imageUrl = newImageUrl.value;
      }      
    });
  }

  onCategoryChanged(event: MatSelectChange) {
    const selectedCategory = {
      key: event.value,
      name: event.source.triggerValue
    }
    this.course.category = selectedCategory;
  }

  onOrderListChanged(event: MatSelectChange) {
    const selectedOrderList = event.value;
    this.course.orderList = selectedOrderList;
  }

  onCancelClick(): void {
    this._dialogRef.close();
  }
}
