import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/shared/service/blog.service';
import { OrderService } from 'src/app/shared/service/order.service';
import { ProductService } from 'src/app/shared/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  public blogList = [];
  public imageAddress = "";
  page = 1;
  pageSize = 10;

  constructor(
    private ordersService: OrderService,
    private blogsService: BlogService,
    private productsService: ProductService
  ) { }

  ngOnInit() {
    this.imageAddress = this.productsService.getImageUrl();

    this.blogsService.getBlogs().subscribe(
      (res: []) => {
        this.blogList = res;
        console.log("this.blogList: ", this.blogList)
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
