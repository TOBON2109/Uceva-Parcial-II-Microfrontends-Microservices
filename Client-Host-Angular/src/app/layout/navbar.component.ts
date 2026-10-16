import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <span class="brand">Inventario / Almacén</span>
      <ul>
        @for (link of links; track link.path) {
          <li>
            <a [routerLink]="link.path" routerLinkActive="active">{{ link.label }}</a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: [
    `
      .navbar {
        display: flex;
        align-items: center;
        gap: 2rem;
        padding: 0.9rem 1.5rem;
        background: #111827;
        font-family: Arial, sans-serif;
      }

      .brand {
        color: #fff;
        font-weight: bold;
        font-size: 1.1rem;
      }

      ul {
        display: flex;
        gap: 0.5rem;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      a {
        padding: 0.45rem 1rem;
        border-radius: 6px;
        color: #d1d5db;
        text-decoration: none;
      }

      a.active {
        background: #2563eb;
        color: #fff;
      }
    `,
  ],
})
export class NavbarComponent {
  links = [
    { path: '/products', label: 'Productos' },
    { path: '/suppliers', label: 'Proveedores' },
    { path: '/orders', label: 'Órdenes' },
  ];
}