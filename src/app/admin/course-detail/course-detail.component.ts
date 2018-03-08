import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSelectChange, MatOption } from '@angular/material';
import { Category } from '../../shared/category';
import { Course } from '../../shared/course';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CategoryService } from '../../shared/category.service';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  title = this.data.course === undefined ? "CREATE NEW COURSE" : "EDIT COURSE";
  newCategoryName: string;
  course: Course;
  coursesList: Course[];
  categories: Category[];
  orderListDefault: string[];
  categoryDefault: string = '';
  formControlOrderList = new FormControl;

  constructor(
    private _categorySvc: CategoryService,
    private _toastr: ToastsManager,
    private _firebaseApp: FirebaseApp,
    private _vcr: ViewContainerRef,
    private _dialog: MatDialog,
    public _dialogRef: MatDialogRef<CourseDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(this.data.course){
      this.course = Object.assign({}, data.course);
      this.coursesList = Object.assign([], data.coursesList);
      this.categoryDefault = this.course.category.key;
      this.formControlOrderList.setValue(this.course.orderList);
    }else{
      this.course = {};
      this.coursesList = Object.assign([], data);
    }
    this._toastr.setRootViewContainerRef(_vcr);
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this._categorySvc.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCategoryChanged(event: MatSelectChange) {
    const selectedCategory = {
      key: event.value,
      name: event.source.triggerValue
    }
    this.course.category = selectedCategory;
  }

  onOrderListChanged(event:MatSelectChange){
    const selectedOrderList = event.value;
    this.course.orderList = selectedOrderList;    
  }

  showCreateCategoryModal() {
    let _dialogRef = this._dialog.open(CreateCategoryComponent, {
      width: '50%'
    });

    _dialogRef.afterClosed().subscribe(newCategoryName => {
      if (newCategoryName !== null && newCategoryName !== '' && newCategoryName !== undefined) {
        this._categorySvc.addCategory(newCategoryName).then(category => {
          this.categoryDefault = category.id;
          this.course.category = {
            key:category.id,
            name:newCategoryName
          }
          this._toastr.success("New category is created successful!", "Success");
        });
      }
    });
  }

  onCancelClick(): void {
    this._dialogRef.close();
  }
}
