import { Component, inject, OnInit, signal } from '@angular/core';
import { ListProductsUseCase } from '../../core/application/use-cases/list-products.use-case';
import { Product } from '../../core/domain/models/product.model';

@Component({
  selector: 'app-product-list',
  template: `
    <h3>Listado de productos</h3>
    @if (loading()) {
      <p>Cargando...</p>
    } @else if (error()) {
      <p class="alert error">{{ error() }}</p>
    } @else {
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          @for (product of products(); track product.code) {
            <tr>
              <td>{{ product.code }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.stock }}</td>
            </tr>
          } @empty {
            <tr>
              <td colspan="5">No hay productos registrados</td>
            </tr>
          }
        </tbody>
      </table>
    }
  `,
  styleUrl: '../shared/shared.scss',
})
export class ProductListComponent implements OnInit {
  private readonly listProducts = inject(ListProductsUseCase);

  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.listProducts.execute().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la lista de productos');
        this.loading.set(false);
      },
    });
  }
}