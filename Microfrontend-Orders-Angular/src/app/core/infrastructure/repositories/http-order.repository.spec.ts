import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CreateOrderRequest, Order } from '../../domain/models/order.model';
import { ORDERS_API_URL } from '../config/api.config';
import { HttpOrderRepository } from './http-order.repository';

describe('HttpOrderRepository', () => {
  const order: Order = {
    id: 1,
    supplierNit: '900123456-1',
    items: [{ productCode: 'P001', quantity: 2, unitPrice: 100 }],
    total: 200,
    status: 'PENDIENTE',
    createdAt: '2026-10-01T10:00:00.000Z',
  };
  let repository: HttpOrderRepository;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpOrderRepository, provideHttpClient(), provideHttpClientTesting()],
    });
    repository = TestBed.inject(HttpOrderRepository);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('getAll debe hacer GET al microservicio', () => {
    let result: Order[] = [];
    repository.getAll().subscribe((orders) => (result = orders));

    const req = http.expectOne(ORDERS_API_URL);
    expect(req.request.method).toBe('GET');
    req.flush([order]);

    expect(result).toEqual([order]);
  });

  it('getById debe hacer GET con el ID en la URL', () => {
    let result: Order | undefined;
    repository.getById(1).subscribe((found) => (result = found));

    const req = http.expectOne(`${ORDERS_API_URL}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(order);

    expect(result).toEqual(order);
  });

  it('create debe hacer POST con la solicitud', () => {
    const request: CreateOrderRequest = { supplierNit: order.supplierNit, items: order.items };
    let result: Order | undefined;
    repository.create(request).subscribe((created) => (result = created));

    const req = http.expectOne(ORDERS_API_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(request);
    req.flush(order);

    expect(result).toEqual(order);
  });
});