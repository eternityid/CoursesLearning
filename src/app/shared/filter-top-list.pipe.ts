import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTopList'
})
export class FilterTopListPipe implements PipeTransform {

  transform(data: any[], topNumber: number): any {
    if(!data) return null;
    data.sort((leftSide,rightSide) => {
      return rightSide.likes - leftSide.likes
    })      
    return data.slice(0,5);
  }

}
