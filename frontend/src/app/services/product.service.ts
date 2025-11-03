import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Product } from '../model/product';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  http=inject(HttpClient);
  getAllProduct(){
    return this.http.get<Product[]>(environment.apiUrl+"/product");
  }
  getProductById(id:String){
    return this.http.get<Product>(environment.apiUrl+"/product/"+id);
  }
  addProduct(model:Product){
    return this.http.post(environment.apiUrl+"/product",model);
  }
  UpdateProduct(id:string,model:Product){
    return this.http.put(environment.apiUrl+"/product/"+id,model);
  }
  deleteProduct(id:string){
    return this.http.delete(environment.apiUrl+"/product/"+id);
  }
}
