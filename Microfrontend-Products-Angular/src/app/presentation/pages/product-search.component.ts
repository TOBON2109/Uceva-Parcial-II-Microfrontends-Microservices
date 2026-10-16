import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetProductByCodeUseCase } from '../../core/application/use-cases/get-product-by-code.use-case';
import { Product } from '../../core/domain/models/product.model';

@Component({
  selector: 'app-product-search',
  imports: [FormsModule],
  template: `
    <h3>Consultar producto por código</h3>
    <form (ngSubmit)="search()">
      <div class="field">
        <label for="code">Código</label>
        <input id="code" name="code" [(ngModel)]="code" />
      </div>
      <button type="submit">Buscar</button>
    </form>
    @if (error()) {
      <p class="alert error">{{ error() }}</p>
    }
    @if (product(); as found) {
      <div class="card">
        <p><strong>Código:</strong> {{ found.code }}</p>
        <p><strong>Nombre:</strong> {{ found.name }}</p>
        <p><strong>Descripción:</strong> {{ found.description }}</p>
        <p><strong>Precio:</strong> {{ found.price }}</p>
        <p><strong>Stock:</strong> {{ found.stock }}</p>
      </div>
    }
  `,
  styleUrl: '../shared/shared.scss',
})
export class ProductSearchComponent {
  private readonly getProductByCode = inject(GetProductByCodeUseCase);

  code = '';
  product = signal<Product | null>(null);
  error = signal('');

  search(): void {
    this.product.set(null);
    this.error.set('');
    this.getProductByCode.execute(this.code).subscribe({
      next: (found) => this.product.set(found),
      error: (err) => {
        this.error.set(err?.error?.message ?? 'No se pudo consultar el producto');
      },
    });
  }
}