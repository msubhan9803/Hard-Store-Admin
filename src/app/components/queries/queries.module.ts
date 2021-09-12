import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueriesRoutingModule } from './queries-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { QueriesListComponent } from './queries-list/query-list.component';
import { QueryDetailComponent } from './query-detail/query-detail.component';



@NgModule({
  declarations: [
    QueriesListComponent,
    QueryDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QueriesRoutingModule
  ]
})
export class QueriesModule { }
