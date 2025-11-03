import { Component, inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { PanierService } from 'src/app/services/panier.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  categories: Category[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  activeCategory: string | null = null;
  pageIndex = 0;
  pageSize = 12;
  totalProducts = 0;
  pages: number[] = [];
  searchTerm:string='';


  ngOnInit() {
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });
    this.productService.getAllProduct().subscribe((result) => {
      this.products = result;
      this.filteredProducts = result; 
      this.totalProducts = this.filteredProducts.length;
      this.calculatePages();
      this.updatePaginatedProducts();
    });
  }
  filterProductsByName() {
    if (this.searchTerm) {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      alert ("type something");
      
    }
    this.pageIndex = 0;
    this.totalProducts = this.filteredProducts.length;
    this.calculatePages();
    this.updatePaginatedProducts();
  }
  
  filterByCategory(categoryId: string | null | undefined) {
    this.activeCategory = categoryId || null;
    if (!categoryId) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter((product) => product.categoryId === categoryId);

    }
    this.pageIndex = 0;
    this.totalProducts = this.filteredProducts.length;
    this.calculatePages();
    this.updatePaginatedProducts();
  }

  calculatePages() {
    const totalPages = Math.ceil(this.totalProducts / this.pageSize);
    this.pages = Array.from({ length: totalPages }, (_, i) => i);
  }

  goToPage(index: number) {
    if (index >= 0 && index < this.pages.length) {
      this.pageIndex = index;
      this.updatePaginatedProducts();
    }
  }

  updatePaginatedProducts() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }


  sortProductsByPrice(event: Event) {
    const target = event.target as HTMLSelectElement;
    const order = target?.value; // Ensure target is not null

    if (order === 'lowToHigh') {
      this.filteredProducts.sort((a, b) => (a.Price - a.promo) - (b.Price - b.promo));
    } else if (order === 'highToLow') {
      this.filteredProducts.sort((a, b) => (b.Price - b.promo) - (a.Price - a.promo));
    }
    // Reset to first page after sorting
    this.pageIndex = 0;
    this.updatePaginatedProducts();
  }
  //ajouter le product en panier 
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
      return;
    }
    if( this.authService.LoginIn && this.authService.isAdmin){
      this.snackBar.open( 'Vous devez être connecté en tant que client pour ajouter des produits au panier.', 'Fermer', {
        duration: 5000,
        panelClass: 'warning-snackbar'
      });
      return;
    }
    if (this.isInPanier(product._id!)) {
      this.snackBar.open( 'Produit est déjà dans votre panier.', 'Fermer', {
        duration: 5000,
        panelClass: 'warning-snackbar'
      });
    } else {
      this.panierService.addPanier(product._id!, 1).subscribe(() => {
        this.panierService.init();
        this.snackBar.open( 'Product added to the cart.', 'Fermer', {
          duration: 5000,
          panelClass: 'warning-snackbar'
        });
        
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