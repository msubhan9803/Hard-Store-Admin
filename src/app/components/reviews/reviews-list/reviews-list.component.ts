import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/shared/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss']
})
export class ReviewsListComponent implements OnInit {

  public reviewList = [];
  public imageAddress = "";
  page = 1;
  pageSize = 10;

  constructor(
    private productsService: ProductService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.imageAddress = this.productsService.getImageUrl();

    this.productsService.getReviews().subscribe(
      (res: []) => {
        this.reviewList = res;
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

  deleteReview(reviewId) {
    Swal.fire({
      title: 'Are you sure?',
      showDenyButton: true,
      confirmButtonText: `Yes`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        await this.productsService.deleteReviews(reviewId).toPromise().then(
          res => {
            this.spinner.hide();
            console.log("hrere...")
            Swal.fire({
              icon: 'success',
              title: 'Successfully Deleted Review',
              showConfirmButton: false,
              timer: 1500
            });
            window.location.reload()
          },
          err => {
            this.spinner.hide();
            Swal.fire({
              icon: 'success',
              title: err.error.message,
              showConfirmButton: false,
              timer: 1500
            });
          }
        )
      }
    })
  }
}
