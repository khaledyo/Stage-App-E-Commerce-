export interface Product{
    _id?:string;
    name: string;
    description: string;
    Price:number;
    promo:number;
    quantity:number;
    images: string[];
    categoryId: string;
}