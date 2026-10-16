import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { CreateOrderUseCase } from '../../core/application/use-cases/create-order.use-case';
import { Order } from '../../core/domain/models/order.model';
import { OrderFormComponent } from './order-form.component';

describe('OrderFormComponent', () => {
  const created: Order = {
    id: 7,
    supplierNit: '900123456-1',
    items: [{ productCode: 'P001', quantity: 3, unitPrice: 100 }],
    total: 300,
    status: 'PENDIENTE',
    createdAt: '2026-10-15T10:00:00.000Z',
  };

  function setup(result$: Observable<Order>) {
    const execute = jasmine.createSpy('execute').and.returnValue(result$);
    TestBed.configureTestingModule({
      imports: [OrderFormComponent],
      providers: [{ provide: CreateOrderUseCase, useValue: { execute } }],
    });
    const fixture = TestBed.createComponent(OrderFormComponent);
    fixture.detectChanges();
    return { component: fixture.componentInstance, execute };
  }

  it('debe iniciar con un ítem vacío', () => {
    const { component } = setup(of(created));

    expect(component.items.length).toBe(1);
  });

  it('debe agregar y quitar ítems', () => {
    const { component } = setup(of(created));

    component.addItem();
    expect(component.items.length).toBe(2);

    component.removeItem(0);
    expect(component.items.length).toBe(1);
  });

  it('no debe quitar el último ítem', () => {
    const { component } = setup(of(created));

    component.removeItem(0);

    expect(component.items.length).toBe(1);
  });

  it('debe crear la orden y limpiar el formulario', () => {
    const { component, execute } = setup(of(created));
    component.supplierNit = '900123456-1';
    component.items = [{ productCode: 'P001', quantity: 3, unitPrice: 100 }];

    component.submit();

    expect(execute).toHaveBeenCalledWith({
      supplierNit: '900123456-1',
      items: [{ productCode: 'P001', quantity: 3, unitPrice: 100 }],
    });
    expect(component.message()).toBe('Orden #7 creada correctamente (total: 300)');
    expect(component.error()).toBe('');
    expect(component.supplierNit).toBe('');
    expect(component.items.length).toBe(1);
    expect(component.items[0].productCode).toBe('');
  });

  it('debe mostrar el mensaje de error del backend', () => {
    const { component } = setup(throwError(() => ({ error: { message: 'El NIT del proveedor es obligatorio' } })));

    component.submit();

    expect(component.error()).toBe('El NIT del proveedor es obligatorio');
    expect(component.message()).toBe('');
  });

  it('debe mostrar un mensaje genérico si el error no trae mensaje', () => {
    const { component } = setup(throwError(() => ({})));

    component.submit();

    expect(component.error()).toBe('No se pudo crear la orden');
  });
});