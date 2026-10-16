import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { GetProductByCodeUseCase } from './get-product-by-code.use-case';

describe('GetProductByCodeUseCase', () => {
  const product: Product = { code: 'P001', name: 'Teclado', description: 'USB', price: 100, stock: 5 };
  let repository: jasmine.SpyObj<ProductRepository>;
  let useCase: GetProductByCodeUseCase;

  beforeEach(() => {
    repository = jasmine.createSpyObj<ProductRepository>('ProductRepository', ['getAll', 'getByCode', 'create']);
    TestBed.configureTestingModule({
      providers: [GetProductByCodeUseCase, { provide: ProductRepository, useValue: repository }],
    });
    useCase = TestBed.inject(GetProductByCodeUseCase);
  });

  it('debe consultar el producto sin espacios en el código', (done) => {
    repository.getByCode.and.returnValue(of(product));

    useCase.execute('  P001  ').subscribe((result) => {
      expect(result).toEqual(product);
      expect(repository.getByCode).toHaveBeenCalledWith('P001');
      done();
    });
  });
});