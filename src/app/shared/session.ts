import { Course } from "./course";
import { User } from "./user";

export interface Session{
    key?:string,
    id?:string,
    beginningDate:Date,
    course:Course,
    timeStu:number,
    maxStudents?:number,
    registeredStudents:User[]
}