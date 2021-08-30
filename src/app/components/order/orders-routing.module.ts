import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './physical/order-list/order-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'order-list',
        component: OrderListComponent,
        data: {
          title: "Order List",
          breadcrumb: "Order List"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrdersRoutingModule { }
