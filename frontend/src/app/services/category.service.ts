import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Category } from '../model/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http=inject(HttpClient)
  constructor() { }
  getCategories(){
    return this.http.get<Category[]>(environment.apiUrl+"/category")
  }
  getCategoriesById(id:String){
    return this.http.get<Category>(environment.apiUrl+"/category/"+id)
  }
  updateCategories(id:String,model:Category){
    return this.http.put(environment.apiUrl+"/category/"+id,model);
  }
  addCategory(model:Category){
    return this.http.post(environment.apiUrl+"/category",model);
  }
  deleteCategories(id:String){
    return this.http.delete(environment.apiUrl+"/category/"+id)
  }
}
