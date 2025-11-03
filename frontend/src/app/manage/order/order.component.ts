import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/model/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  displayedColumns: string[] = ['id','name','date','number','location','itemsCount','total','view','status'];
  dataSource: MatTableDataSource<Order>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  orderService = inject(OrderService);

  constructor() {
    this.dataSource = new MatTableDataSource([] as Order[]);
  }

  ngOnInit() {
    this.orderService.getOrder().subscribe((orders: Order[]) => {
      this.dataSource.data = orders.map(order => ({
        ...order,
        customerName: `${order.address?.firstName || ''} ${order.address?.lastName || ''}`
      }));
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

  deleteOrder(id: string) {
    this.orderService.updateStatus(id, 'Deleted').subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(order => order._id !== id);
    });
  }
  statuChange(event: any, order: Order) {
    const status = event.target.value;  // Get the new status from the dropdown
    if (order._id && status) {  // Ensure both are defined
      this.orderService.updateStatus(order._id, status).subscribe(result => {
        alert("Order Status updated");
        order.status = status;  
      });
    } else {
      alert("Invalid order or status");
    }
  }
  
  
}
