import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-suppliers-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <section class="container">
      <h2>Proveedores</h2>
      <nav class="tabs">
        <a routerLink="." routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Listar</a>
        <a routerLink="new" routerLinkActive="active">Registrar</a>
        <a routerLink="search" routerLinkActive="active">Consultar por NIT</a>
      </nav>
      <router-outlet />
    </section>
  `,
  styleUrl: '../shared/shared.scss',
})
export class SuppliersLayoutComponent {}