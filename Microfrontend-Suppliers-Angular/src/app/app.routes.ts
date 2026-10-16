import { Routes } from '@angular/router';
import { SUPPLIERS_PROVIDERS } from './core/infrastructure/config/suppliers.providers';
import { SuppliersLayoutComponent } from './presentation/layout/suppliers-layout.component';
import { SupplierFormComponent } from './presentation/pages/supplier-form.component';
import { SupplierListComponent } from './presentation/pages/supplier-list.component';
import { SupplierSearchComponent } from './presentation/pages/supplier-search.component';

export const routes: Routes = [
  {
    path: '',
    component: SuppliersLayoutComponent,
    providers: SUPPLIERS_PROVIDERS,
    children: [
      { path: '', component: SupplierListComponent, pathMatch: 'full' },
      { path: 'new', component: SupplierFormComponent },
      { path: 'search', component: SupplierSearchComponent },
    ],
  },
];