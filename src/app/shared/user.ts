import { Time } from "@angular/common";
import { Session } from "./session";

export interface User{
    key:string,
    token:string,
    expire:number,
    role:string,
    username:string,
    password:string,
    studyingCourse:Session,
    passedCourses:string[]
}