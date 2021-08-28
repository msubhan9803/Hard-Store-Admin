import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/service/product.service';
import { productDB } from 'src/app/shared/tables/product-list';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public product_list = [];
  public imageAddress = "";
  page = 1;
  pageSize = 10;

  constructor(
    private productsService: ProductService
  ) { }

  ngOnInit() {
    this.imageAddress = this.productsService.getImageUrl();
    console.log("this.imageAddress: ", this.imageAddress)

    this.productsService.getProducts().subscribe(
      (res: []) => {
        console.log("res: ", res)
        this.product_list = res;
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

  activeSale(id) {
    console.log("sale product id : ", id)
    Swal.fire({
      title: 'Are you sure?',
      showDenyButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.activeSale(id).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Successfully Activated Sale',
              showConfirmButton: false,
              timer: 1500
            });
          }
        )
      }
    })
  }
}
