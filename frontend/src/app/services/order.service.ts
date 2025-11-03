import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  http=inject(HttpClient);
  addOrder(order:Order){
    return this.http.post(environment.apiUrl+'/order',order);
  }
  getOrder(){
    return this.http.get<Order[]>(environment.apiUrl+'/order');
  }
  updateStatus(id:string,status:string){
    return this.http.put(environment.apiUrl+'/order/'+id,{
      status: status,
    });
  }
  
}
