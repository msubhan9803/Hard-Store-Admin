import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateCurrencyComponent } from './update-currency/update-currency.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateCurrencyComponent,
    data: {
      title: "Update Currency",
      breadcrumb: "Update Currency"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UpdateCurrencyRoutingModule { }
