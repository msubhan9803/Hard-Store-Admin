import { Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';

export const content: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/products/products.module').then(m => m.ProductsModule),
    data: {
      breadcrumb: "Products"
    }
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/order/orders.module').then(m => m.OrdersModule),
    data: {
      breadcrumb: "Orders"
    }
  },
  {
    path: 'faq',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/faq/faq.module').then(m => m.FaqModule),
    data: {
      breadcrumb: "Faq"
    }
  },
  {
    path: 'update-currency',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/update-currency/update-currency.module').then(m => m.UpdateCurrencyModule),
    data: {
      breadcrumb: "Update Currency Rate"
    }
  },
  {
    path: 'blogs',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/blogs/blogs.module').then(m => m.BlogsModule),
    data: {
      breadcrumb: "Blogs"
    }
  },
  {
    path: 'reviews',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/reviews/reviews.module').then(m => m.ReviewsModule),
    data: {
      breadcrumb: "Blogs"
    }
  },
  {
    path: 'queries',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/queries/queries.module').then(m => m.QueriesModule),
    data: {
      breadcrumb: "Queries"
    }
  },
  {
    path: 'sales',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/sales/sales.module').then(m => m.SalesModule),
    data: {
      breadcrumb: "Sales"
    }
  },
  {
    path: 'coupons',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/coupons/coupons.module').then(m => m.CouponsModule),
    data: {
      breadcrumb: "Coupons"
    }
  },
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/pages/pages.module').then(m => m.PagesModule),
    data: {
      breadcrumb: "Pages"
    }
  },
  {
    path: 'media',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/media/media.module').then(m => m.MediaModule),
  },
  {
    path: 'menus',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/menus/menus.module').then(m => m.MenusModule),
    data: {
      breadcrumb: "Menus"
    }
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/users/users.module').then(m => m.UsersModule),
    data: {
      breadcrumb: "Users"
    }
  },
  {
    path: 'vendors',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/vendors/vendors.module').then(m => m.VendorsModule),
    data: {
      breadcrumb: "Vendors"
    }
  },
  {
    path: 'localization',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/localization/localization.module').then(m => m.LocalizationModule),
    data: {
      breadcrumb: "Localization"
    }
  },
  {
    path: 'reports',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/reports/reports.module').then(m => m.ReportsModule),
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/setting/setting.module').then(m => m.SettingModule),
    data: {
      breadcrumb: "Settings"
    }
  },
  {
    path: 'invoice',
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/invoice/invoice.module').then(m => m.InvoiceModule),
    data: {
      breadcrumb: "Invoice"
    }
  }
];
