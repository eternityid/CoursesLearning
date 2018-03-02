import { Time } from "@angular/common";

export interface User{
    key:string,
    token:string,
    expire:number,
    role:number,
    username:string,
    password:string,
    studyingCourse:string,
    studiedCourses:Array<string>
}