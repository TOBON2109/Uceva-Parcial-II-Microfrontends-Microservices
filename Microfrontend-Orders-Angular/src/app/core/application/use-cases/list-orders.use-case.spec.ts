import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Order } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { ListOrdersUseCase } from './list-orders.use-case';

describe('ListOrdersUseCase', () => {
  const orders: Order[] = [
    {
      id: 1,
      supplierNit: '900123456-1',
      items: [{ productCode: 'P001', quantity: 2, unitPrice: 100 }],
      total: 200,
      status: 'PENDIENTE',
      createdAt: '2026-10-01T10:00:00.000Z',
    },
  ];
  let repository: jasmine.SpyObj<OrderRepository>;
  let useCase: ListOrdersUseCase;

  beforeEach(() => {
    repository = jasmine.createSpyObj<OrderRepository>('OrderRepository', ['getAll', 'getById', 'create']);
    TestBed.configureTestingModule({
      providers: [ListOrdersUseCase, { provide: OrderRepository, useValue: repository }],
    });
    useCase = TestBed.inject(ListOrdersUseCase);
  });

  it('debe devolver las órdenes del repositorio', (done) => {
    repository.getAll.and.returnValue(of(orders));

    useCase.execute().subscribe((result) => {
      expect(result).toEqual(orders);
      expect(repository.getAll).toHaveBeenCalledTimes(1);
      done();
    });
  });
});