import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CKEditorModule } from 'ngx-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqListComponent } from './faq-list/faq-list.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FilePickerModule } from 'ngx-awesome-uploader';
import {NgxPaginationModule} from 'ngx-pagination';
import { OrderStatusUpdateModalComponent } from './order-status-update-modal/order-status-update-modal.component';
import { OrderStatusTimelineComponent } from './order-status-timeline/order-status-timeline.component';
import { AddFaqComponent } from './add-faq/add-faq.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};

@NgModule({
  declarations: [FaqListComponent, AddFaqComponent, OrderStatusUpdateModalComponent, OrderStatusTimelineComponent],
  imports: [
    NgxDropzoneModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    FaqRoutingModule,
    Ng2SmartTableModule,
    NgbModule,
    DropzoneModule,
    GalleryModule.forRoot(),
    SharedModule,
    FilePickerModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    NgbActiveModal
  ]
})
export class FaqModule { }
