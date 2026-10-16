import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateProductUseCase } from '../../core/application/use-cases/create-product.use-case';
import { Product } from '../../core/domain/models/product.model';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule],
  template: `
    <h3>Crear producto</h3>
    <form (ngSubmit)="submit()">
      <div class="field">
        <label for="code">Código</label>
        <input id="code" name="code" [(ngModel)]="product.code" />
      </div>
      <div class="field">
        <label for="name">Nombre</label>
        <input id="name" name="name" [(ngModel)]="product.name" />
      </div>
      <div class="field">
        <label for="description">Descripción</label>
        <input id="description" name="description" [(ngModel)]="product.description" />
      </div>
      <div class="field">
        <label for="price">Precio</label>
        <input id="price" name="price" type="number" [(ngModel)]="product.price" />
      </div>
      <div class="field">
        <label for="stock">Stock</label>
        <input id="stock" name="stock" type="number" [(ngModel)]="product.stock" />
      </div>
      <button type="submit">Guardar</button>
    </form>
    @if (message()) {
      <p class="alert success">{{ message() }}</p>
    }
    @if (error()) {
      <p class="alert error">{{ error() }}</p>
    }
  `,
  styleUrl: '../shared/shared.scss',
})
export class ProductFormComponent {
  private readonly createProduct = inject(CreateProductUseCase);

  product: Product = this.emptyProduct();
  message = signal('');
  error = signal('');

  submit(): void {
    this.message.set('');
    this.error.set('');
    this.createProduct.execute(this.product).subscribe({
      next: (created) => {
        this.message.set(`Producto ${created.code} creado correctamente`);
        this.product = this.emptyProduct();
      },
      error: (err) => {
        this.error.set(err?.error?.message ?? 'No se pudo crear el producto');
      },
    });
  }

  private emptyProduct(): Product {
    return { code: '', name: '', description: '', price: 0, stock: 0 };
  }
}