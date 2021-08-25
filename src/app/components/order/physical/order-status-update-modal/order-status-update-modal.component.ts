import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/shared/service/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-status-update-modal',
  templateUrl: './order-status-update-modal.component.html',
  styleUrls: ['./order-status-update-modal.component.scss']
})
export class OrderStatusUpdateModalComponent implements OnInit {
  public order: any;
  @ViewChild('orderStatusTemp') orderStatusTemp: TemplateRef<any>;
  closeResult = '';
  errorMessage = "";
  disableSaveButton = false;
  public current_Status: "";
  public tracking_Status = {
    order_Confirmed: {
      date: "",
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false
    },
    ready_for_Delivery: {
      date: "",
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false
    },
    out_For_Delivery: {
      date: "",
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false
    },
    delivered: {
      date: "",
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false
    },
    Paid: {
      date: "",
      status: "",
      disabled: false,
      completed: false,
      inProgress: false,
      cancelled: false
    },
  };
  currentChangedKey = "";

  constructor(
    private modalService: NgbModal,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
  }

  open(order) {
    console.log("order => ", order)
    this.order = order;
    this.current_Status = this.order.tracking_Status.current_Status;

    Object.entries(this.order.tracking_Status).forEach(([key, value]) => {
      if (key != "current_Status") {
        let status = {
          date: this.order.tracking_Status[key].date ? this.order.tracking_Status[key].date : null,
          status: this.order.tracking_Status[key].status ? this.order.tracking_Status[key].status : null,
          disabled: key != this.current_Status ? true : false,
          completed: this.order.tracking_Status[key].status == "completed" ? true : false,
          inProgress: this.order.tracking_Status[key].status == "inProgress" ? true : false,
          cancelled: this.order.tracking_Status[key].status == "cancelled" ? true : false
        }

        this.tracking_Status[key] = status;
      }
    });

    console.log("this.tracking_Status: ", this.tracking_Status)

    this.modalService.open(this.orderStatusTemp, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public checkStatusCheckboxVal(key) {
    this.currentChangedKey = key;
    let errorCount = 0;
    Object.entries(this.tracking_Status).forEach(([key, value]) => {
      if (this.tracking_Status[key].completed && this.tracking_Status[key].cancelled) {
        errorCount += 1;
      }
    });

    if (errorCount > 0) {
      this.errorMessage = "Not allowed to check both Completed and Cancelled";
      this.disableSaveButton = true;
    } else {
      this.errorMessage = "";
      this.disableSaveButton = false;
    }

    if (this.errorMessage == "") {
      console.log("payload to be generated for: ", this.tracking_Status[this.current_Status])

      let payload = {
        orderId: this.order._id,
        current_status: this.current_Status,
        status: this.tracking_Status[this.current_Status].completed ? "completed" :
          this.tracking_Status[this.current_Status].cancelled ? "cancelled" : ""
        // "comment":"customer not picked it "
      };

      this.orderService.updateOrderStatus(payload).subscribe(
        (res: any) => {
          this.modalService.dismissAll();

          Swal.fire({
            icon: 'success',
            title: 'Successfully Updated Order',
            showConfirmButton: false,
            timer: 1500
          });

          window.location.reload();
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 1500
          })
        }
      )
    }
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

  public capitalizeFirstLetter(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }
}
