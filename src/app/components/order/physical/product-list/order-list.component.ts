import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/service/order.service';
import { ProductService } from 'src/app/shared/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  public orderList = [];
  public imageAddress = "";
  page = 1;
  pageSize = 10;

  constructor(
    private ordersService: OrderService,
    private productsService: ProductService
  ) { }

  ngOnInit() {
    this.imageAddress = this.productsService.getImageUrl();

    this.ordersService.getOrders().subscribe(
      (res: []) => {
        this.orderList = res;
        console.log("this.orderList: ", this.orderList)
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: "Something went wrong!",
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }
}
