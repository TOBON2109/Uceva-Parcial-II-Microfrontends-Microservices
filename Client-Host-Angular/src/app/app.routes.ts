import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { REMOTES } from './core/config/remotes.config';

const loadRemoteRoutes = (remoteEntry: string) => () =>
  loadRemoteModule({ type: 'module', remoteEntry, exposedModule: './Routes' }).then(
    (module) => module.routes as Routes,
  );

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', loadChildren: loadRemoteRoutes(REMOTES.products) },
  { path: 'suppliers', loadChildren: loadRemoteRoutes(REMOTES.suppliers) },
  { path: 'orders', loadChildren: loadRemoteRoutes(REMOTES.orders) },
  { path: '**', redirectTo: 'products' },
];