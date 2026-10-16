import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetOrderByIdUseCase } from '../../core/application/use-cases/get-order-by-id.use-case';
import { Order } from '../../core/domain/models/order.model';

@Component({
  selector: 'app-order-search',
  imports: [FormsModule],
  template: `
    <h3>Consultar orden por ID</h3>
    <form (ngSubmit)="search()">
      <div class="field">
        <label for="orderId">ID de la orden</label>
        <input id="orderId" name="orderId" type="number" [(ngModel)]="orderId" />
      </div>
      <button type="submit">Buscar</button>
    </form>
    @if (error()) {
      <p class="alert error">{{ error() }}</p>
    }
    @if (order(); as found) {
      <div class="card">
        <p><strong>ID:</strong> {{ found.id }}</p>
        <p><strong>NIT proveedor:</strong> {{ found.supplierNit }}</p>
        <p><strong>Estado:</strong> {{ found.status }}</p>
        <p><strong>Total:</strong> {{ found.total }}</p>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
            </tr>
          </thead>
          <tbody>
            @for (item of found.items; track $index) {
              <tr>
                <td>{{ item.productCode }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ item.unitPrice }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    }
  `,
  styleUrl: '../shared/shared.scss',
})
export class OrderSearchComponent {
  private readonly getOrderById = inject(GetOrderByIdUseCase);

  orderId: number | null = null;
  order = signal<Order | null>(null);
  error = signal('');

  search(): void {
    this.order.set(null);
    this.error.set('');
    this.getOrderById.execute(this.orderId ?? 0).subscribe({
      next: (found) => this.order.set(found),
      error: (err) => {
        this.error.set(err?.error?.message ?? 'No se pudo consultar la orden');
      },
    });
  }
}