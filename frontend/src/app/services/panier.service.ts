import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Panier } from '../model/panier';
import { environment } from 'src/environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class PanierService {
    http=inject(HttpClient);
    items:Panier[]=[];
    init(){
      this.getPanier().subscribe(result=>{
        this.items=result;
      })
    }
    getPanier(){
      return this.http.get<Panier[]>(environment.apiUrl+'/panier');
    }
    addPanier(productId: string, quantity: number) {
      return this.http.post(environment.apiUrl + '/panier/' + productId, { quantity });
    }
    
    
    removePanier(productId:string){
      return this.http.delete(environment.apiUrl+'/panier/'+productId);
    }
}
