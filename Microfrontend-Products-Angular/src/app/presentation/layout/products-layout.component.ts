import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <section class="container">
      <h2>Productos</h2>
      <nav class="tabs">
        <a routerLink="." routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Listar</a>
        <a routerLink="new" routerLinkActive="active">Crear</a>
        <a routerLink="search" routerLinkActive="active">Consultar por código</a>
      </nav>
      <router-outlet />
    </section>
  `,
  styleUrl: '../shared/shared.scss',
})
export class ProductsLayoutComponent {}