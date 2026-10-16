import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { CreateProductUseCase } from './create-product.use-case';

describe('CreateProductUseCase', () => {
  const product: Product = { code: 'P004', name: 'Cable HDMI', description: '2 metros', price: 15000, stock: 50 };
  let repository: jasmine.SpyObj<ProductRepository>;
  let useCase: CreateProductUseCase;

  beforeEach(() => {
    repository = jasmine.createSpyObj<ProductRepository>('ProductRepository', ['getAll', 'getByCode', 'create']);
    TestBed.configureTestingModule({
      providers: [CreateProductUseCase, { provide: ProductRepository, useValue: repository }],
    });
    useCase = TestBed.inject(CreateProductUseCase);
  });

  it('debe crear el producto mediante el repositorio', (done) => {
    repository.create.and.returnValue(of(product));

    useCase.execute(product).subscribe((result) => {
      expect(result).toEqual(product);
      expect(repository.create).toHaveBeenCalledWith(product);
      done();
    });
  });
});