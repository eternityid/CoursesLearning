import { Time } from "@angular/common";
import { Course } from "./course";

export interface User{
    key:string,
    token:string,
    expire:number,
    role:string,
    username:string,
    password:string,
    studyingCourse:Course,
    passedCourses:string[]
}