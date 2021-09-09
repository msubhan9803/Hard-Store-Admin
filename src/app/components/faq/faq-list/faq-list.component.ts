import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperMethodsService } from 'src/app/shared/service/helper-methods.service';
import { OrderService } from 'src/app/shared/service/order.service';
import { ProductService } from 'src/app/shared/service/product.service';
import Swal from 'sweetalert2';
import { OrderStatusTimelineComponent } from '../order-status-timeline/order-status-timeline.component';
import { OrderStatusUpdateModalComponent } from '../order-status-update-modal/order-status-update-modal.component';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss']
})
export class FaqListComponent implements OnInit {

  public orderList = [];
  public imageAddress = "";
  page = 1;
  pageSize = 10;
  @ViewChild(OrderStatusUpdateModalComponent) orderStatusUpdateModalComponent: OrderStatusUpdateModalComponent;
  @ViewChild(OrderStatusTimelineComponent) orderStatusTimelineComponent: OrderStatusTimelineComponent;
  public dummyData = [
    {
      "question": "How to order simply dummy text of the printing and typesetting industry?",
      "answer": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      "question": "How to order simply dummy text of the printing and typesetting industry?",
      "answer": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      "question": "How to order simply dummy text of the printing and typesetting industry?",
      "answer": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
      "question": "How to order simply dummy text of the printing and typesetting industry?",
      "answer": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
  ]

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
