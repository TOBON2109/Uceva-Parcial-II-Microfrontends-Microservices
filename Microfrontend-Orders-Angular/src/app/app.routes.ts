import { Routes } from '@angular/router';
import { ORDERS_PROVIDERS } from './core/infrastructure/config/orders.providers';
import { OrdersLayoutComponent } from './presentation/layout/orders-layout.component';
import { OrderFormComponent } from './presentation/pages/order-form.component';
import { OrderListComponent } from './presentation/pages/order-list.component';
import { OrderSearchComponent } from './presentation/pages/order-search.component';

export const routes: Routes = [
  {
    path: '',
    component: OrdersLayoutComponent,
    providers: ORDERS_PROVIDERS,
    children: [
      { path: '', component: OrderListComponent, pathMatch: 'full' },
      { path: 'new', component: OrderFormComponent },
      { path: 'search', component: OrderSearchComponent },
    ],
  },
];