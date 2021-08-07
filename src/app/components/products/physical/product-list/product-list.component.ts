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

  constructor(
    private productsService: ProductService
  ) { }

  ngOnInit() {
    this.imageAddress = this.productsService.getImageUrl();
    console.log("this.imageAddress: ", this.imageAddress)

    this.productsService.getProducts().subscribe(
      (res: []) => {
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
}
