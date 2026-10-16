import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ListProductsUseCase } from './list-products.use-case';

describe('ListProductsUseCase', () => {
  const products: Product[] = [
    { code: 'P001', name: 'Teclado', description: 'USB', price: 100, stock: 5 },
  ];
  let repository: jasmine.SpyObj<ProductRepository>;
  let useCase: ListProductsUseCase;

  beforeEach(() => {
    repository = jasmine.createSpyObj<ProductRepository>('ProductRepository', ['getAll', 'getByCode', 'create']);
    TestBed.configureTestingModule({
      providers: [ListProductsUseCase, { provide: ProductRepository, useValue: repository }],
    });
    useCase = TestBed.inject(ListProductsUseCase);
  });

  it('debe devolver los productos del repositorio', (done) => {
    repository.getAll.and.returnValue(of(products));

    useCase.execute().subscribe((result) => {
      expect(result).toEqual(products);
      expect(repository.getAll).toHaveBeenCalledTimes(1);
      done();
    });
  });
});