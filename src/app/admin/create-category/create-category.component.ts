import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  categoryName: string = '';
  constructor(public _dialogRef: MatDialogRef<CreateCategoryComponent>) { }

  ngOnInit() {
  }

  onCancelClick(): void {
    this._dialogRef.close();
  }

}
