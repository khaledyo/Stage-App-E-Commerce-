import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  category: Category = { name: '', image: '' }; 
  categoryService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit = false;
  id!: string;

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; 
    if (this.id) {
      this.isEdit = true; 
      this.categoryService.getCategoriesById(this.id).subscribe((result: Category) => {
        this.category = result; 
      });
    } else {
      this.isEdit = false; 
    }
  }

  add() {
    this.categoryService.addCategory(this.category).subscribe(() => {
      alert('Category added');
      this.category = { name: '', image: '' }; 
      this.router.navigateByUrl('/admin/categories'); 
    });
  }

  update() {
    this.categoryService.updateCategories(this.id, this.category).subscribe(() => {
      alert('Category updated');
      this.router.navigateByUrl('/admin/categories'); 
    });
  }
}
