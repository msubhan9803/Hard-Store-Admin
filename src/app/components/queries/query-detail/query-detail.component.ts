import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { monthNames } from 'src/app/shared/data/other';
import { HelperMethodsService } from 'src/app/shared/service/helper-methods.service';
import { OrderService } from 'src/app/shared/service/order.service';
import { ProductService } from 'src/app/shared/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-query-detail',
  templateUrl: './query-detail.component.html',
  styleUrls: ['./query-detail.component.scss']
})
export class QueryDetailComponent implements OnInit {
  public queryDetail;
  closeResult = '';
  public themeFooterLogo: string = 'assets/images/logo-new.png';
  @ViewChild('orderStatusTimeline') orderStatusTimeline: TemplateRef<any>;

  constructor(
    private modalService: NgbModal,
    private orderService: OrderService,
    private productService: ProductService,
    public helperMethodsService: HelperMethodsService
  ) { }

  ngOnInit(): void { }

  open(queryDetail) {
    console.log("queryDetail: ", queryDetail)
    this.queryDetail = queryDetail;
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
