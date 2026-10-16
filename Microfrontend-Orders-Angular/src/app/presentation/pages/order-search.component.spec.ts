import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { GetOrderByIdUseCase } from '../../core/application/use-cases/get-order-by-id.use-case';
import { Order } from '../../core/domain/models/order.model';
import { OrderSearchComponent } from './order-search.component';

describe('OrderSearchComponent', () => {
  const order: Order = {
    id: 1,
    supplierNit: '900123456-1',
    items: [{ productCode: 'P001', quantity: 2, unitPrice: 100 }],
    total: 200,
    status: 'PENDIENTE',
    createdAt: '2026-10-01T10:00:00.000Z',
  };

  function setup(result$: Observable<Order>) {
    const execute = jasmine.createSpy('execute').and.returnValue(result$);
    TestBed.configureTestingModule({
      imports: [OrderSearchComponent],
      providers: [{ provide: GetOrderByIdUseCase, useValue: { execute } }],
    });
    const fixture = TestBed.createComponent(OrderSearchComponent);
    fixture.detectChanges();
    return { component: fixture.componentInstance, execute };
  }

  it('debe mostrar la orden encontrada', () => {
    const { component, execute } = setup(of(order));
    component.orderId = 1;

    component.search();

    expect(execute).toHaveBeenCalledWith(1);
    expect(component.order()).toEqual(order);
    expect(component.error()).toBe('');
  });

  it('debe consultar con 0 si no se ingresó un ID', () => {
    const { component, execute } = setup(of(order));
    component.orderId = null;

    component.search();

    expect(execute).toHaveBeenCalledWith(0);
  });

  it('debe mostrar el mensaje de error del backend', () => {
    const { component } = setup(throwError(() => ({ error: { message: 'No existe una orden' } })));

    component.search();

    expect(component.order()).toBeNull();
    expect(component.error()).toBe('No existe una orden');
  });

  it('debe mostrar un mensaje genérico si el error no trae mensaje', () => {
    const { component } = setup(throwError(() => ({})));

    component.search();

    expect(component.error()).toBe('No se pudo consultar la orden');
  });
});