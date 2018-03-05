import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent, MatOption } from '@angular/material';
import { Category } from '../../shared/category';
import { Course } from '../../shared/course';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { CategoryService } from '../../shared/category.service';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  title = this.data.key == undefined ? "Create new Course" : "Edit course";
  newCategoryName: string;
  filteredOptions: Observable<Category[]>;
  myControl: FormControl = new FormControl();

  constructor(
    private categorySvc: CategoryService,
    private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    public dialogRef: MatDialogRef<CourseDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }


  ngOnInit() {
    this.getCategories();
    this.myControl.setValue(this.data.category);
  }

  filterCategories(name: string,categories:Category[]): Category[] {
    return categories.filter(category =>
      category.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(category?: Category): string | undefined {
    if(this.data != undefined){
      return this.data.category.name;
    }
    return category ? category.name : undefined;
  }

  getCategories() {
    this.categorySvc.getCategories().subscribe(categories => {
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Category>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filterCategories(name,categories) : categories.slice())
      );     
    });
  }

  clickToCheckCategory(newCategoryName: string) {
    if (newCategoryName === undefined || newCategoryName === null || newCategoryName === "" ) {
      this.toastr.error(`Please fill category's name when click Create Button`, 'Error');
    } else {
      this.categorySvc.addCategory(newCategoryName);
      this.toastr.success(`Create category successful`, 'Success');
      this.newCategoryName = null;      
    }
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.data.category = event.option.value;
  }

  onNoClick(): void {
    console.log("teteing")
    this.dialogRef.close();
  }
}
