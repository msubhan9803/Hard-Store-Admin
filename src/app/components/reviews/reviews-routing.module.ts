import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'review-list',
        component: ReviewsListComponent,
        data: {
          title: "Review List",
          breadcrumb: "Review List"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ReviewsRoutingModule { }
