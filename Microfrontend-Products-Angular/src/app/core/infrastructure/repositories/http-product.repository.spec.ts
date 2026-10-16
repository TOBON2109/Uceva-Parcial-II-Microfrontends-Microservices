import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Product } from '../../domain/models/product.model';
import { PRODUCTS_API_URL } from '../config/api.config';
import { HttpProductRepository } from './http-product.repository';

describe('HttpProductRepository', () => {
  const product: Product = { code: 'P001', name: 'Teclado', description: 'USB', price: 100, stock: 5 };
  let repository: HttpProductRepository;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpProductRepository, provideHttpClient(), provideHttpClientTesting()],
    });
    repository = TestBed.inject(HttpProductRepository);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('getAll debe hacer GET al microservicio', () => {
    let result: Product[] = [];
    repository.getAll().subscribe((products) => (result = products));

    const req = http.expectOne(PRODUCTS_API_URL);
    expect(req.request.method).toBe('GET');
    req.flush([product]);

    expect(result).toEqual([product]);
  });

  it('getByCode debe hacer GET con el código en la URL', () => {
    let result: Product | undefined;
    repository.getByCode('P001').subscribe((found) => (result = found));

    const req = http.expectOne(`${PRODUCTS_API_URL}/P001`);
    expect(req.request.method).toBe('GET');
    req.flush(product);

    expect(result).toEqual(product);
  });

  it('create debe hacer POST con el producto', () => {
    let result: Product | undefined;
    repository.create(product).subscribe((created) => (result = created));

    const req = http.expectOne(PRODUCTS_API_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(product);
    req.flush(product);

    expect(result).toEqual(product);
  });
});