import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CreateOrderRequest, Order } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { CreateOrderUseCase } from './create-order.use-case';

describe('CreateOrderUseCase', () => {
  const request: CreateOrderRequest = {
    supplierNit: '900123456-1',
    items: [{ productCode: 'P001', quantity: 3, unitPrice: 120000 }],
  };
  const created: Order = {
    id: 3,
    supplierNit: '900123456-1',
    items: request.items,
    total: 360000,
    status: 'PENDIENTE',
    createdAt: '2026-10-15T10:00:00.000Z',
  };
  let repository: jasmine.SpyObj<OrderRepository>;
  let useCase: CreateOrderUseCase;

  beforeEach(() => {
    repository = jasmine.createSpyObj<OrderRepository>('OrderRepository', ['getAll', 'getById', 'create']);
    TestBed.configureTestingModule({
      providers: [CreateOrderUseCase, { provide: OrderRepository, useValue: repository }],
    });
    useCase = TestBed.inject(CreateOrderUseCase);
  });

  it('debe crear la orden mediante el repositorio', (done) => {
    repository.create.and.returnValue(of(created));

    useCase.execute(request).subscribe((result) => {
      expect(result).toEqual(created);
      expect(repository.create).toHaveBeenCalledWith(request);
      done();
    });
  });
});