import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { FeatherIconsComponent } from './components/feather-icons/feather-icons.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NavService } from './service/nav.service';
import { WINDOW_PROVIDERS } from './service/windows.service';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { EnvironmentUrlService } from './service/enviroment-url.service';
import { CategoryService } from './service/category.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductService } from './service/product.service';
import { NgToggleModule } from 'ng-toggle-button';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './service/auth.service';
import { LoginAuthGuard } from './guard/loginAuth.guard';
import {NgxPaginationModule} from 'ngx-pagination';
import { BlogService } from './service/blog.service';
import { DashboardService } from './service/dashboard.service';
import { HelperMethodsService } from './service/helper-methods.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { TimeagoModule } from 'ngx-timeago';
import { UpdateCurrencyModalComponent } from '../components/update-currency/update-currency-modal/update-currency-modal.component';
import { DiscountPipe } from './pipes/discount.pipe';
import { AedToDollarPipe } from './pipes/aed-to-dollar.pipe';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxSpinnerModule } from 'ngx-spinner';
import { QuillModule } from 'ngx-quill';
@NgModule({
  declarations: [
    ToggleFullscreenDirective,
    FeatherIconsComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ContentLayoutComponent,
    BreadcrumbComponent,
    RightSidebarComponent,
    DiscountPipe,
    AedToDollarPipe,
    UpdateCurrencyModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    AngularEditorModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    NgbModule,
    NgToggleModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    BarRatingModule,
    TimeagoModule.forRoot(),
    NgxSpinnerModule,
    QuillModule.forRoot()
  ],
  providers: [
    NavService,
    CategoryService,
    ProductService,
    EnvironmentUrlService,
    WINDOW_PROVIDERS,
    AuthGuard,
    LoginAuthGuard,
    AuthService,
    BlogService,
    HelperMethodsService,
    UserService,
    DashboardService
  ],
  exports: [
    FeatherIconsComponent,
    ToggleFullscreenDirective,
    AngularEditorModule,
    NgMultiSelectDropDownModule,
    NgSelectModule,
    NgbModule,
    NgToggleModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    TimeagoModule,
    DiscountPipe,
    AedToDollarPipe,
    UpdateCurrencyModalComponent,
    BarRatingModule,
    NgxSpinnerModule,
    QuillModule
  ]
})
export class SharedModule { }
