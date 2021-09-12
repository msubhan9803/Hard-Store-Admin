import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperMethodsService } from 'src/app/shared/service/helper-methods.service';
import { ProductService } from 'src/app/shared/service/product.service';
import Swal from 'sweetalert2';
import { FaqDetailModalModalComponent } from '../faq-detail-modal/faq-detail-modal.component';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss']
})
export class FaqListComponent implements OnInit {
  public faqType = 'shipping';
  public faqList = [];
  public imageAddress = "";
  page = 1;
  pageSize = 10;
  @ViewChild(FaqDetailModalModalComponent) faqDetailModalModalComponent: FaqDetailModalModalComponent;

  constructor(
    private productService: ProductService,
    public helperMethodsService: HelperMethodsService
  ) { }

  ngOnInit() {
    this.imageAddress = this.productService.getImageUrl();
    this.updateFaqList(this.faqType);
  }

  onTypeChange() {
    this.updateFaqList(this.faqType)
  }

  updateFaqList(faqType) {
    this.productService.getFaqsByType(faqType).subscribe(
      (res: []) => {
        this.faqList = res;
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
