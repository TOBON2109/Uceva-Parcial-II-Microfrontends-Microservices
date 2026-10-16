import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ListOrdersUseCase } from '../../core/application/use-cases/list-orders.use-case';
import { Order } from '../../core/domain/models/order.model';

@Component({
  selector: 'app-order-list',
  imports: [DatePipe],
  template: `
    <h3>Listado de órdenes</h3>
    @if (loading()) {
      <p>Cargando...</p>
    } @else if (error()) {
      <p class="alert error">{{ error() }}</p>
    } @else {
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NIT proveedor</th>
            <th>Ítems</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          @for (order of orders(); track order.id) {
            <tr>
              <td>{{ order.id }}</td>
              <td>{{ order.supplierNit }}</td>
              <td>{{ order.items.length }}</td>
              <td>{{ order.total }}</td>
              <td>{{ order.status }}</td>
              <td>{{ order.createdAt | date: 'short' }}</td>
            </tr>
          } @empty {
            <tr>
              <td colspan="6">No hay órdenes registradas</td>
            </tr>
          }
        </tbody>
      </table>
    }
  `,
  styleUrl: '../shared/shared.scss',
})
export class OrderListComponent implements OnInit {
  private readonly listOrders = inject(ListOrdersUseCase);

  orders = signal<Order[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.listOrders.execute().subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la lista de órdenes');
        this.loading.set(false);
      },
    });
  }
}