import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrderComponent } from './physical/add-order/add-order.component';
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
      },
      {
        path: 'create-order',
        component: AddOrderComponent,
        data: {
          title: "Create Order",
          breadcrumb: "Create Order"
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
