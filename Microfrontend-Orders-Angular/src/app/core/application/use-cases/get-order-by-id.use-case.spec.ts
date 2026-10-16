import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Order } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { GetOrderByIdUseCase } from './get-order-by-id.use-case';

describe('GetOrderByIdUseCase', () => {
  const order: Order = {
    id: 1,
    supplierNit: '900123456-1',
    items: [{ productCode: 'P001', quantity: 2, unitPrice: 100 }],
    total: 200,
    status: 'PENDIENTE',
    createdAt: '2026-10-01T10:00:00.000Z',
  };
  let repository: jasmine.SpyObj<OrderRepository>;
  let useCase: GetOrderByIdUseCase;

  beforeEach(() => {
    repository = jasmine.createSpyObj<OrderRepository>('OrderRepository', ['getAll', 'getById', 'create']);
    TestBed.configureTestingModule({
      providers: [GetOrderByIdUseCase, { provide: OrderRepository, useValue: repository }],
    });
    useCase = TestBed.inject(GetOrderByIdUseCase);
  });

  it('debe consultar la orden por su ID', (done) => {
    repository.getById.and.returnValue(of(order));

    useCase.execute(1).subscribe((result) => {
      expect(result).toEqual(order);
      expect(repository.getById).toHaveBeenCalledWith(1);
      done();
    });
  });
});