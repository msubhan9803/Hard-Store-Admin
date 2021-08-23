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

  deleteBlog(id) {
    console.log(id)
    Swal.fire({
      title: 'Are you sure?',
      showDenyButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let payload = {
          blog_id: id
        };
        this.blogsService.deleteBlog(payload).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'Successfully Deleted',
              showConfirmButton: false,
              timer: 1500
            });

            // window.location.reload();
          }
        )
      }
    })
  }
}
