import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterSupplierUseCase } from '../../core/application/use-cases/register-supplier.use-case';
import { Supplier } from '../../core/domain/models/supplier.model';

@Component({
  selector: 'app-supplier-form',
  imports: [FormsModule],
  template: `
    <h3>Registrar proveedor</h3>
    <form (ngSubmit)="submit()">
      <div class="field">
        <label for="nit">NIT</label>
        <input id="nit" name="nit" [(ngModel)]="supplier.nit" />
      </div>
      <div class="field">
        <label for="name">Nombre</label>
        <input id="name" name="name" [(ngModel)]="supplier.name" />
      </div>
      <div class="field">
        <label for="email">Correo electrónico</label>
        <input id="email" name="email" [(ngModel)]="supplier.email" />
      </div>
      <div class="field">
        <label for="phone">Teléfono</label>
        <input id="phone" name="phone" [(ngModel)]="supplier.phone" />
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
export class SupplierFormComponent {
  private readonly registerSupplier = inject(RegisterSupplierUseCase);

  supplier: Supplier = this.emptySupplier();
  message = signal('');
  error = signal('');

  submit(): void {
    this.message.set('');
    this.error.set('');
    this.registerSupplier.execute(this.supplier).subscribe({
      next: (created) => {
        this.message.set(`Proveedor ${created.nit} registrado correctamente`);
        this.supplier = this.emptySupplier();
      },
      error: (err) => {
        this.error.set(err?.error?.message ?? 'No se pudo registrar el proveedor');
      },
    });
  }

  private emptySupplier(): Supplier {
    return { nit: '', name: '', email: '', phone: '' };
  }
}