import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { AuthService } from 'src/app/services/auth.service';
import { PanierService } from 'src/app/services/panier.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  productService=inject(ProductService);
  route=inject(ActivatedRoute);
  product!: Product;
  id!:string;
  ngOnInit(){
    this.id=this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe((result)=>{
      this.product=result;
    })
  }
  snackBar=inject(MatSnackBar);
  panierService=inject(PanierService);
  authService=inject(AuthService);
  router=inject(Router);
  addToCart(product:Product){
    if( !this.authService.LoginIn){
      this.router.navigateByUrl("/login");
      this.snackBar.open( 'Vous devez être connecté.', 'Fermer', {
        duration: 5000,
        panelClass: 'warning-snackbar'
      });
    }
    if (this.isInPanier(product._id!)) {
      this.snackBar.open( 'Produit est déjà dans votre panier.', 'Fermer', {
        duration: 5000,
        panelClass: 'warning-snackbar'
      });
    } else {
      this.panierService.addPanier(product._id!, 1).subscribe(() => {
        this.snackBar.open( 'Product added to the cart.', 'Fermer', {
          duration: 5000,
          panelClass: 'warning-snackbar'
        });
        this.panierService.init(); // Refresh the cart items
      });
    }
  
  }
  isInPanier(productId:string){
    if(this.panierService.items.find(x=>x.product._id==productId)){
      return true;
    }else{
      return false;
    }
  }

}
