import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperMethodsService } from 'src/app/shared/service/helper-methods.service';
import { OrderService } from 'src/app/shared/service/order.service';
import { ProductService } from 'src/app/shared/service/product.service';
import Swal from 'sweetalert2';
import { OrderStatusTimelineComponent } from '../order-status-timeline/order-status-timeline.component';
import { OrderStatusUpdateModalComponent } from '../order-status-update-modal/order-status-update-modal.component';

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
  @ViewChild(OrderStatusUpdateModalComponent) orderStatusUpdateModalComponent: OrderStatusUpdateModalComponent;
  @ViewChild(OrderStatusTimelineComponent) orderStatusTimelineComponent: OrderStatusTimelineComponent;

  constructor(
    private ordersService: OrderService,
    private productsService: ProductService,
    public helperMethodsService: HelperMethodsService
  ) { }

  ngOnInit() {
    this.imageAddress = this.productsService.getImageUrl();

    this.ordersService.getOrders().subscribe(
      (res: []) => {
        this.orderList = res;
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
