import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Supplier } from '../../domain/models/supplier.model';
import { SUPPLIERS_API_URL } from '../config/api.config';
import { HttpSupplierRepository } from './http-supplier.repository';

describe('HttpSupplierRepository', () => {
  const supplier: Supplier = { nit: '900123456-1', name: 'Distribuidora Tech', email: 'ventas@tech.com', phone: '3001234567' };
  let repository: HttpSupplierRepository;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpSupplierRepository, provideHttpClient(), provideHttpClientTesting()],
    });
    repository = TestBed.inject(HttpSupplierRepository);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('getAll debe hacer GET al microservicio', () => {
    let result: Supplier[] = [];
    repository.getAll().subscribe((suppliers) => (result = suppliers));

    const req = http.expectOne(SUPPLIERS_API_URL);
    expect(req.request.method).toBe('GET');
    req.flush([supplier]);

    expect(result).toEqual([supplier]);
  });

  it('getByNit debe hacer GET con el NIT codificado en la URL', () => {
    let result: Supplier | undefined;
    repository.getByNit('900123456-1').subscribe((found) => (result = found));

    const req = http.expectOne(`${SUPPLIERS_API_URL}/900123456-1`);
    expect(req.request.method).toBe('GET');
    req.flush(supplier);

    expect(result).toEqual(supplier);
  });

  it('register debe hacer POST con el proveedor', () => {
    let result: Supplier | undefined;
    repository.register(supplier).subscribe((created) => (result = created));

    const req = http.expectOne(SUPPLIERS_API_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(supplier);
    req.flush(supplier);

    expect(result).toEqual(supplier);
  });
});