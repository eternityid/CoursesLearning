import { Time } from "@angular/common";

export interface User{
    key:string,
    token:string,
    expire:number,
    role:string,
    username:string,
    password:string,
    studyingCourse:string,
    studiedCourses:Array<string>
}