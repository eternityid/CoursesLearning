import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
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

  title = this.data.key == undefined ? "CREATE NEW COURSE" : "EDIT COURSE";
  newCategoryName: string;
  course: Course;
  categories: Category[];
  categoryDefault: string;

  constructor(
    private categorySvc: CategoryService,
    private toastr: ToastsManager,
    private firebaseApp: FirebaseApp,
    private vcr: ViewContainerRef,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CourseDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course
  ) {
    this.course = Object.assign({}, data);
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getCategories();
    this.categoryDefault = this.course.category.key;
  }

  getCategories() {
    this.categorySvc.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSelectionChanged(event: MatSelectChange) {
    let selectedCategory = {
      key: event.value,
      name: event.source.triggerValue
    }
    this.course.category = selectedCategory;
  }

  showCreateCategoryModal() {
    let dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(newCategoryName => {
      if (newCategoryName !== null && newCategoryName !== '' && newCategoryName !== undefined) {
        this.categorySvc.addCategory(newCategoryName).then(category => {
          this.categoryDefault = category.id;
          this.course.category = {
            key:category.id,
            name:newCategoryName
          }
          this.toastr.success("New category is created successful!", "Success");
        });
      }
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
