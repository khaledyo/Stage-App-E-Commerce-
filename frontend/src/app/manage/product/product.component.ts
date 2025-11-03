import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service'; // Inject CategoryService

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  displayedColumns: string[] = ['productImage','Images', 'name','categoryName','Price','promo', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productService = inject(ProductService);
  categoryService = inject(CategoryService); // Inject CategoryService

  constructor() {
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit(){
    this.productService.getAllProduct().subscribe((products: any) => {
      this.categoryService.getCategories().subscribe((categories: any) => {
        // Add category name to each product
        products.forEach((product: any) => {
          const category = categories.find((cat: any) => cat._id === product.categoryId);
          if (category) {
            product.categoryName = category.name; 
          }
        });
        this.dataSource.data = products; // Set data with category names
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: string) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.productService.getAllProduct().subscribe((result: any) => {
        this.dataSource.data = result; // Reload the table data
      });
    });
  }
}
