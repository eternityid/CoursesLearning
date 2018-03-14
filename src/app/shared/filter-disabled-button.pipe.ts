import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './course';

@Pipe({
  name: 'filterDisabledButton'
})
export class FilterDisabledButtonPipe implements PipeTransform {

  transform(target: Course,sourceFilter?:string[]): any {
    if(sourceFilter && sourceFilter.indexOf(target.key) == -1){
      return true;
    }
    return false;
  }
}
