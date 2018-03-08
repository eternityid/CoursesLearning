import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { Category } from './category';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class CategoryService {
  
  categories:Observable<Category[]>;
  constructor(private _firestore: AngularFirestore) { }

  getCategories(){
    return this._firestore.collection('categories').snapshotChanges().map(categories =>{      
      return categories.map(category =>{
        const data = category.payload.doc.data() as Category;
        data.key = category.payload.doc.id;      
        return data;
      })
    })
  }

  addCategory(category:string){
    return this._firestore.collection('categories').add({name:category});
  }
}
