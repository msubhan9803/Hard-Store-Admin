import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueriesListComponent } from './queries-list/query-list.component';

const routes: Routes = [
  {
    path: '',
    component: QueriesListComponent,
    data: {
      title: "Queries",
      breadcrumb: "Queries"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class QueriesRoutingModule { }
