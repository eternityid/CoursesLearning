export interface Course{
    key?:string,
    teacherName?:string,
    description?:string,
    amountOfStudents?:number,
    beginingOfDate?:Date,
    time?:number,    
    currentStudents?:number,
    categoryId?:string,
    listOrder?:Array<string>    
}