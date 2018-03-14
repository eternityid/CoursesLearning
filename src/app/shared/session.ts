import { Course } from "./course";
import { User } from "./user";
import { Teacher } from "./teacher";

export interface Session{
    key?:string,
    id?:string,
    beginningDate?:Date,
    course?:Course,
    teacher?:Teacher,
    time?:number,
    maxStudents?:number,
    registedStudents?:string[]
}