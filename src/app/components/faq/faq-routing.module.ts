import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { FaqListComponent } from './faq-list/faq-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'faq-list',
        component: FaqListComponent,
        data: {
          title: "Faq List",
          breadcrumb: "Faq List"
        }
      },
      {
        path: 'add-faq',
        component: AddFaqComponent,
        data: {
          title: "Add Faq List",
          breadcrumb: "Add Faq List"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FaqRoutingModule { }
