import {Category} from './category';
export interface Course{
    key?:string,
    imageUrl?:string,
    teacherName?:string,
    name?:string,
    description?:string,
    amountOfStudents?:number,
    beginingOfDate?:Date,
    time?:number,    
    currentStudents?:number,
    category?:Category,
    listOrder?:Array<Course>    
}