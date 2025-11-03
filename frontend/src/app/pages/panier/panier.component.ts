import { Component } from '@angular/core';

import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  constructor(public panierService: PanierService) {}

  ngOnInit(): void {
    this.panierService.init(); 
  }

  getTotal(): number {
    return this.panierService.items.reduce((total, { product, quantity }) => {
      let price = product.Price;
      if (product.promo > 0) {
        price = product.Price - product.promo;
      }
      return total + price * quantity;
    }, 0);
    
  }
  

  updateQuantity(productId: string, quantity: number): void {
    if (quantity > 0) {
      this.panierService.addPanier(productId, quantity).subscribe(() => {
        this.panierService.init();
      });
    }
  }

  removeFromCart(productId: string): void {
    this.panierService.removePanier(productId).subscribe(() => {
      this.panierService.init(); 
    });
  }

  checkout(): void {
    alert('Proceeding to checkout');
  }
}