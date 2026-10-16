import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GetSupplierByNitUseCase } from '../../core/application/use-cases/get-supplier-by-nit.use-case';
import { Supplier } from '../../core/domain/models/supplier.model';

@Component({
  selector: 'app-supplier-search',
  imports: [FormsModule],
  template: `
    <h3>Consultar proveedor por NIT</h3>
    <form (ngSubmit)="search()">
      <div class="field">
        <label for="nit">NIT</label>
        <input id="nit" name="nit" [(ngModel)]="nit" />
      </div>
      <button type="submit">Buscar</button>
    </form>
    @if (error()) {
      <p class="alert error">{{ error() }}</p>
    }
    @if (supplier(); as found) {
      <div class="card">
        <p><strong>NIT:</strong> {{ found.nit }}</p>
        <p><strong>Nombre:</strong> {{ found.name }}</p>
        <p><strong>Correo:</strong> {{ found.email }}</p>
        <p><strong>Teléfono:</strong> {{ found.phone }}</p>
      </div>
    }
  `,
  styleUrl: '../shared/shared.scss',
})
export class SupplierSearchComponent {
  private readonly getSupplierByNit = inject(GetSupplierByNitUseCase);

  nit = '';
  supplier = signal<Supplier | null>(null);
  error = signal('');

  search(): void {
    this.supplier.set(null);
    this.error.set('');
    this.getSupplierByNit.execute(this.nit).subscribe({
      next: (found) => this.supplier.set(found),
      error: (err) => {
        this.error.set(err?.error?.message ?? 'No se pudo consultar el proveedor');
      },
    });
  }
}