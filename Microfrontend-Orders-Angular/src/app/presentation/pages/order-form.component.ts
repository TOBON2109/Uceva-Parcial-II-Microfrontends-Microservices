import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateOrderUseCase } from '../../core/application/use-cases/create-order.use-case';
import { OrderItem } from '../../core/domain/models/order.model';

@Component({
  selector: 'app-order-form',
  imports: [FormsModule],
  template: `
    <h3>Crear orden de compra</h3>
    <form (ngSubmit)="submit()">
      <div class="field">
        <label for="supplierNit">NIT del proveedor</label>
        <input id="supplierNit" name="supplierNit" [(ngModel)]="supplierNit" />
      </div>

      <h4>Ítems</h4>
      @for (item of items; track $index) {
        <div class="item-row">
          <div class="field">
            <label [for]="'productCode' + $index">Código de producto</label>
            <input [id]="'productCode' + $index" [name]="'productCode' + $index" [(ngModel)]="item.productCode" />
          </div>
          <div class="field">
            <label [for]="'quantity' + $index">Cantidad</label>
            <input [id]="'quantity' + $index" [name]="'quantity' + $index" type="number" [(ngModel)]="item.quantity" />
          </div>
          <div class="field">
            <label [for]="'unitPrice' + $index">Precio unitario</label>
            <input [id]="'unitPrice' + $index" [name]="'unitPrice' + $index" type="number" [(ngModel)]="item.unitPrice" />
          </div>
          <button type="button" class="danger" (click)="removeItem($index)">Quitar</button>
        </div>
      }

      <div class="actions">
        <button type="button" class="secondary" (click)="addItem()">Agregar ítem</button>
        <button type="submit">Guardar orden</button>
      </div>
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
export class OrderFormComponent {
  private readonly createOrder = inject(CreateOrderUseCase);

  supplierNit = '';
  items: OrderItem[] = [this.emptyItem()];
  message = signal('');
  error = signal('');

  addItem(): void {
    this.items.push(this.emptyItem());
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.splice(index, 1);
    }
  }

  submit(): void {
    this.message.set('');
    this.error.set('');
    this.createOrder.execute({ supplierNit: this.supplierNit, items: this.items }).subscribe({
      next: (created) => {
        this.message.set(`Orden #${created.id} creada correctamente (total: ${created.total})`);
        this.supplierNit = '';
        this.items = [this.emptyItem()];
      },
      error: (err) => {
        this.error.set(err?.error?.message ?? 'No se pudo crear la orden');
      },
    });
  }

  private emptyItem(): OrderItem {
    return { productCode: '', quantity: 1, unitPrice: 0 };
  }
}