import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  constructor(private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<FileUploadComponent>) { }

  ngOnInit() {
  }

  startUpload(event: FileList) {

    const file = event[0];

    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    const path = `assets/${new Date().getTime()}_${file.name}`;

    const customMetadata = { app: 'Image upload!' };

    this.task = this.storage.upload(path, file, { customMetadata })

    this.downloadURL = this.task.downloadURL();

  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
