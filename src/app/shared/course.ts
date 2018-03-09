import {Category} from './category';
import { Teacher } from './teacher';
export interface Course{
    key?:string,
    imageUrl?:string,
    teacher?:Teacher,
    name?:string,
    description?:string,
    amountOfStudents?:number,
    beginingOfDate?:Date,
    time?:number,    
    currentStudents?:number,
    category?:Category,
    categoryId?:string,
    orderList?:string[]
}