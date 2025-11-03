import { Component, inject, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  
})
export class CategoriesComponent {
  displayedColumns: string[] = ['id','image', 'name', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  categoryService=inject(CategoryService);
  
  constructor() {
    
    this.dataSource = new MatTableDataSource([] as  any);
  }
  
  ngOnInit(){
    this.categoryService.getCategories().subscribe((result:any)=>{
      console.log(result);
      this.dataSource.data=result;
    })
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
    this.categoryService.deleteCategories(id).subscribe(() => {
      this.categoryService.getCategories().subscribe((result: any) => {
        this.dataSource.data = result; // Reload the table data
      });
    });
  }
  
  
}

