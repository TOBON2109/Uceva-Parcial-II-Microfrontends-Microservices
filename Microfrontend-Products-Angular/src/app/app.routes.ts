import { Routes } from '@angular/router';
import { PRODUCTS_PROVIDERS } from './core/infrastructure/config/products.providers';
import { ProductsLayoutComponent } from './presentation/layout/products-layout.component';
import { ProductFormComponent } from './presentation/pages/product-form.component';
import { ProductListComponent } from './presentation/pages/product-list.component';
import { ProductSearchComponent } from './presentation/pages/product-search.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductsLayoutComponent,
    providers: PRODUCTS_PROVIDERS,
    children: [
      { path: '', component: ProductListComponent, pathMatch: 'full' },
      { path: 'new', component: ProductFormComponent },
      { path: 'search', component: ProductSearchComponent },
    ],
  },
];