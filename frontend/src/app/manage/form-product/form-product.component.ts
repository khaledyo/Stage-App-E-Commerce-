import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/model/category';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent {
  productForm: FormGroup;
  id!:string;
  categories: Category[] = [];
  route=inject(ActivatedRoute);
  categoryService = inject(CategoryService);
  productService=inject(ProductService);
  router=inject(Router)
  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      promo: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      Price: ['', [Validators.required, Validators.min(0)]],
      images: this.fb.array([]),
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((result: Category[]) => {
      this.categories = result;
    });
    this.id=this.route.snapshot.params["id"];
    if(this.id){
      this.productService.getProductById(this.id).subscribe((result: any) => {
        if (result && result.images) {
          for (let i = 0; i < result.images.length; i++) {
            this.addImage();
          }
          this.productForm.patchValue(result);
        } else {
          console.error("Invalid product data received");
        }
      });}}
  

  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  addImage(): void {
    this.images.push(this.fb.control(''));
  }

  deleteImage(): void {
    if (this.images.length > 0) {
      this.images.removeAt(this.images.length - 1);
    }
  }

  add(): void {
   
    let prod = this.productForm.value;
    console.log(prod);
    this.productService.addProduct(prod as any).subscribe((result) => {
      alert("Product added");
      this.router.navigateByUrl("/admin/products");
    });
  }
  update(): void {
   
    let prod = this.productForm.value;
    console.log(prod);
    this.productService.UpdateProduct(this.id,prod as any).subscribe((result) => {
      alert("Product updated");
      this.router.navigateByUrl("/admin/products");
    });
  }
  
  
}
