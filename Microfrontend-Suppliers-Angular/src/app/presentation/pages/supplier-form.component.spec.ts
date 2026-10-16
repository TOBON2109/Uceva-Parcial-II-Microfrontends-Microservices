import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { RegisterSupplierUseCase } from '../../core/application/use-cases/register-supplier.use-case';
import { Supplier } from '../../core/domain/models/supplier.model';
import { SupplierFormComponent } from './supplier-form.component';

describe('SupplierFormComponent', () => {
  const supplier: Supplier = { nit: '902222333-4', name: 'Ferretería Central', email: 'v@ferre.com', phone: '3151112233' };

  function setup(result$: Observable<Supplier>): SupplierFormComponent {
    TestBed.configureTestingModule({
      imports: [SupplierFormComponent],
      providers: [{ provide: RegisterSupplierUseCase, useValue: { execute: () => result$ } }],
    });
    const fixture = TestBed.createComponent(SupplierFormComponent);
    fixture.detectChanges();
    return fixture.componentInstance;
  }

  it('debe registrar el proveedor y limpiar el formulario', () => {
    const component = setup(of(supplier));
    component.supplier = { ...supplier };

    component.submit();

    expect(component.message()).toBe('Proveedor 902222333-4 registrado correctamente');
    expect(component.error()).toBe('');
    expect(component.supplier.nit).toBe('');
  });

  it('debe mostrar el mensaje de error del backend', () => {
    const component = setup(throwError(() => ({ error: { message: 'NIT duplicado' } })));

    component.submit();

    expect(component.error()).toBe('NIT duplicado');
    expect(component.message()).toBe('');
  });

  it('debe mostrar un mensaje genérico si el error no trae mensaje', () => {
    const component = setup(throwError(() => ({})));

    component.submit();

    expect(component.error()).toBe('No se pudo registrar el proveedor');
  });
});