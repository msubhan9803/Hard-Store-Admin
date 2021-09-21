import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateCurrencyRoutingModule } from './update-currency-routing.module';
import { UpdateCurrencyComponent } from './update-currency/update-currency.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UpdateCurrencyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UpdateCurrencyRoutingModule
  ]
})

export class UpdateCurrencyModule { }
