import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  authService = inject(AuthService);
  panierService = inject(PanierService);
  formBuilder = inject(FormBuilder);
  router=inject(Router);
  adressForm: FormGroup = this.formBuilder.group({
    prenom: ['',Validators.required],
    nom: ['',Validators.required],
    adresse: ['',Validators.required],
    telephone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    City: ['',Validators.required],
    codePostal: ['',[Validators.required, Validators.pattern(/^\d{4}$/)]],
  });

  ngOnInit(): void {
    this.panierService.init();
  }

  getTotal(): number {
    return this.panierService.items.reduce((total, { product, quantity }) => {
      const price = product.promo > 0 ? product.Price - product.promo : product.Price;
      return total + price * quantity;
    }, 0);
  }

  removeFromCart(productId: string): void {
    this.panierService.removePanier(productId).subscribe(() => {
      this.panierService.init();
    });
  }
  orderService=inject(OrderService);
  addAdress(){
    if (this.adressForm.invalid) {
      this.adressForm.markAllAsTouched(); 
      return;
    }
    let order :Order={
      items:this.panierService.items,
      address:this.adressForm.value,
      date:new Date(),
      total:this. getTotal() + (this.getTotal() >= 300 ? 0 : 9),
    };
    this.orderService.addOrder(order).subscribe(result=>{
      alert("Your Order is completed");
      this.panierService.init();
    });
    this.router.navigateByUrl('/');
  }
}
