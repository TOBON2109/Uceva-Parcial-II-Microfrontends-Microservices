import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { ListSuppliersUseCase } from '../../core/application/use-cases/list-suppliers.use-case';
import { Supplier } from '../../core/domain/models/supplier.model';
import { SupplierListComponent } from './supplier-list.component';

describe('SupplierListComponent', () => {
  const suppliers: Supplier[] = [
    { nit: '900123456-1', name: 'Distribuidora Tech', email: 'ventas@tech.com', phone: '3001234567' },
    { nit: '900654321-2', name: 'Suministros del Valle', email: 'c@sumi.com', phone: '3109876543' },
  ];

  function setup(result$: Observable<Supplier[]>): ComponentFixture<SupplierListComponent> {
    TestBed.configureTestingModule({
      imports: [SupplierListComponent],
      providers: [{ provide: ListSuppliersUseCase, useValue: { execute: () => result$ } }],
    });
    const fixture = TestBed.createComponent(SupplierListComponent);
    fixture.detectChanges();
    fixture.detectChanges();
    return fixture;
  }

  it('debe mostrar una fila por proveedor', () => {
    const fixture = setup(of(suppliers));
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('900123456-1');
  });

  it('debe mostrar mensaje cuando no hay proveedores', () => {
    const fixture = setup(of([]));

    expect(fixture.nativeElement.textContent).toContain('No hay proveedores registrados');
  });

  it('debe mostrar mensaje de error si falla la carga', () => {
    const fixture = setup(throwError(() => new Error('fallo')));

    expect(fixture.componentInstance.error()).toBe('No se pudo cargar la lista de proveedores');
    expect(fixture.nativeElement.textContent).toContain('No se pudo cargar la lista de proveedores');
  });
});