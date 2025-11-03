import { Panier } from "./panier"

export interface Order{
    _id?:string;
    items:Panier[];
    address:any;
    date:Date;
    total:Number;
    status?:string;
}