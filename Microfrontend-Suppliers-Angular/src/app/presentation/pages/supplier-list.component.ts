import { Component, inject, OnInit, signal } from '@angular/core';
import { ListSuppliersUseCase } from '../../core/application/use-cases/list-suppliers.use-case';
import { Supplier } from '../../core/domain/models/supplier.model';

@Component({
  selector: 'app-supplier-list',
  template: `
    <h3>Listado de proveedores</h3>
    @if (loading()) {
      <p>Cargando...</p>
    } @else if (error()) {
      <p class="alert error">{{ error() }}</p>
    } @else {
      <table>
        <thead>
          <tr>
            <th>NIT</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          @for (supplier of suppliers(); track supplier.nit) {
            <tr>
              <td>{{ supplier.nit }}</td>
              <td>{{ supplier.name }}</td>
              <td>{{ supplier.email }}</td>
              <td>{{ supplier.phone }}</td>
            </tr>
          } @empty {
            <tr>
              <td colspan="4">No hay proveedores registrados</td>
            </tr>
          }
        </tbody>
      </table>
    }
  `,
  styleUrl: '../shared/shared.scss',
})
export class SupplierListComponent implements OnInit {
  private readonly listSuppliers = inject(ListSuppliersUseCase);

  suppliers = signal<Supplier[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.listSuppliers.execute().subscribe({
      next: (suppliers) => {
        this.suppliers.set(suppliers);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la lista de proveedores');
        this.loading.set(false);
      },
    });
  }
}