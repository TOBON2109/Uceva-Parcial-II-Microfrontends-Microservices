import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { GetSupplierByNitUseCase } from '../../core/application/use-cases/get-supplier-by-nit.use-case';
import { Supplier } from '../../core/domain/models/supplier.model';
import { SupplierSearchComponent } from './supplier-search.component';

describe('SupplierSearchComponent', () => {
  const supplier: Supplier = { nit: '900123456-1', name: 'Distribuidora Tech', email: 'ventas@tech.com', phone: '3001234567' };

  function setup(result$: Observable<Supplier>): SupplierSearchComponent {
    TestBed.configureTestingModule({
      imports: [SupplierSearchComponent],
      providers: [{ provide: GetSupplierByNitUseCase, useValue: { execute: () => result$ } }],
    });
    const fixture = TestBed.createComponent(SupplierSearchComponent);
    fixture.detectChanges();
    return fixture.componentInstance;
  }

  it('debe mostrar el proveedor encontrado', () => {
    const component = setup(of(supplier));
    component.nit = '900123456-1';

    component.search();

    expect(component.supplier()).toEqual(supplier);
    expect(component.error()).toBe('');
  });

  it('debe mostrar el mensaje de error del backend', () => {
    const component = setup(throwError(() => ({ error: { message: 'No existe un proveedor' } })));

    component.search();

    expect(component.supplier()).toBeNull();
    expect(component.error()).toBe('No existe un proveedor');
  });

  it('debe mostrar un mensaje genérico si el error no trae mensaje', () => {
    const component = setup(throwError(() => ({})));

    component.search();

    expect(component.error()).toBe('No se pudo consultar el proveedor');
  });
});