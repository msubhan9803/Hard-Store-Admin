import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperMethodsService } from 'src/app/shared/service/helper-methods.service';
import { OrderService } from 'src/app/shared/service/order.service';
import { ProductService } from 'src/app/shared/service/product.service';
import Swal from 'sweetalert2';
import { monthNames } from '../../../../shared/data/other'

@Component({
  selector: 'app-order-status-timeline',
  templateUrl: './order-status-timeline.component.html',
  styleUrls: ['./order-status-timeline.component.scss']
})
export class OrderStatusTimelineComponent implements OnInit {
  public orderId;
  @ViewChild('orderStatusTimeline') orderStatusTimeline: TemplateRef<any>;
  public showTimeLine = false;
  public showProducts = false;
  public searchValue = "";
  public imageAddress = "";
  public monthNames = monthNames;
  public order;
  public live = false;
  public tracking_Status = {
    order_Confirmed: {
      date: null,
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false,
      comment: ""
    },
    ready_for_Delivery: {
      date: null,
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false,
      comment: ""
    },
    out_For_Delivery: {
      date: null,
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false,
      comment: ""
    },
    delivered: {
      date: null,
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false,
      comment: ""
    },
    Paid: {
      date: null,
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false,
      comment: ""
    },
  };
  closeResult = '';
  public product_List = [];
  public themeFooterLogo: string = 'assets/images/logo-new.png';
  public total = 0;

  constructor(
    private modalService: NgbModal,
    private orderService: OrderService,
    private productService: ProductService,
    public helperMethodsService: HelperMethodsService
  ) { }

  ngOnInit(): void {
    this.imageAddress = this.productService.getImageUrl();
  }

  open(orderId) {
    this.orderId = orderId;
    this.product_List = [];

    this.orderService.getOrderbyId(this.orderId).subscribe(
      async (res: any) => {
        this.order = res;
        Object.entries(res.tracking_Status).forEach(([key, value]) => {
          if (key != "current_Status") {
            let status = {
              date: res.tracking_Status[key].date ? new Date(res.tracking_Status[key].date) : null,
              status: res.tracking_Status[key].status ? res.tracking_Status[key].status : null,
              // disabled: key != this.current_Status ? true : false,
              completed: res.tracking_Status[key].status == "completed" ? true : false,
              inProgress: res.tracking_Status[key].status == "inProgress" ? true : false,
              cancelled: res.tracking_Status[key].status == "cancelled" ? true : false,
              comment: res.tracking_Status[key].comment ? res.tracking_Status[key].comment : ""
            }

            this.tracking_Status[key] = status;
          }
        });

        this.product_List = res.products;

        this.total = 0;
        this.product_List.forEach(product => {
          this.total += (product.unit_Cost - (product.unit_Cost - product.discount)) * product.quantity;
        })

        this.showTimeLine = true;
        this.showProducts = true;
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: "Invalid Order Id",
          showConfirmButton: false,
          timer: 1500
        })
      }
    )

    this.modalService.open(this.orderStatusTimeline, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
