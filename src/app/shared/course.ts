import {Category} from './category';
export interface Course{
    key?:string,
    teacherName?:string,
    description?:string,
    amountOfStudents?:number,
    beginingOfDate?:Date,
    time?:number,    
    currentStudents?:number,
    category?:Category,
    listOrder?:Array<string>    
}