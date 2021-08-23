import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogDetailEditComponent } from './blog-detail-edit/blog-detail-edit.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogListComponent } from './blogs-list/blog-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'blog-list',
        component: BlogListComponent,
        data: {
          title: "Blog List",
          breadcrumb: "Blog List"
        }
      },
      {
        path: 'blog-detail/addBlog',
        component: BlogDetailComponent,
        data: {
          title: "Add Blog",
          breadcrumb: "Add Blog Detail"
        }
      },
      {
        path: 'blog-detail/:id',
        component: BlogDetailEditComponent,
        data: {
          title: "Edit Blog Detail",
          breadcrumb: "Edit Blog Detail"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BlogsRoutingModule { }
