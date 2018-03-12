import {Category} from './category';
export interface Course{
    key?:string,
    imageUrl?:string,
    name?:string,
    description?:string,
    category?:Category,
    orderList?:string[],
    likes?:number
}