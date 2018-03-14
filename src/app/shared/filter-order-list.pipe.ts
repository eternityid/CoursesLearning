import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './course';

@Pipe({
  name: 'filterOrderList'
})
export class FilterOrderListPipe implements PipeTransform {

  transform(dataSource: Course[], dataFilter: string[]): any {
    let data = new Array<string>();
    dataSource.forEach(ele => {
      if (dataFilter.indexOf(ele.key) > -1) {
        data.push(ele.name);
      }
    });
    return data;
  }

}
