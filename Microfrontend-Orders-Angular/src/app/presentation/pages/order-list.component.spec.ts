import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { ListOrdersUseCase } from '../../core/application/use-cases/list-orders.use-case';
import { Order } from '../../core/domain/models/order.model';
import { OrderListComponent } from './order-list.component';

describe('OrderListComponent', () => {
  const orders: Order[] = [
    {
      id: 1,
      supplierNit: '900123456-1',
      items: [{ productCode: 'P001', quantity: 2, unitPrice: 100 }],
      total: 200,
      status: 'PENDIENTE',
      createdAt: '2026-10-01T10:00:00.000Z',
    },
    {
      id: 2,
      supplierNit: '900654321-2',
      items: [{ productCode: 'P003', quantity: 5, unitPrice: 500 }],
      total: 2500,
      status: 'PENDIENTE',
      createdAt: '2026-10-05T15:30:00.000Z',
    },
  ];

  function setup(result$: Observable<Order[]>): ComponentFixture<OrderListComponent> {
    TestBed.configureTestingModule({
      imports: [OrderListComponent],
      providers: [{ provide: ListOrdersUseCase, useValue: { execute: () => result$ } }],
    });
    const fixture = TestBed.createComponent(OrderListComponent);
    fixture.detectChanges();
    fixture.detectChanges();
    return fixture;
  }

  it('debe mostrar una fila por orden', () => {
    const fixture = setup(of(orders));
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('900123456-1');
  });

  it('debe mostrar mensaje cuando no hay órdenes', () => {
    const fixture = setup(of([]));

    expect(fixture.nativeElement.textContent).toContain('No hay órdenes registradas');
  });

  it('debe mostrar mensaje de error si falla la carga', () => {
    const fixture = setup(throwError(() => new Error('fallo')));

    expect(fixture.componentInstance.error()).toBe('No se pudo cargar la lista de órdenes');
    expect(fixture.nativeElement.textContent).toContain('No se pudo cargar la lista de órdenes');
  });
});