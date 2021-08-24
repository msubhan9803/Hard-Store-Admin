import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-status-update-modal',
  templateUrl: './order-status-update-modal.component.html',
  styleUrls: ['./order-status-update-modal.component.scss']
})
export class OrderStatusUpdateModalComponent implements OnInit {
  @ViewChild('orderStatusTemp') orderStatusTemp: TemplateRef<any>;
  closeResult = '';

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }

  open() {
    this.modalService.open(this.orderStatusTemp, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
