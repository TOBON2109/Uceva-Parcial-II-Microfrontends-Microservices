import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Supplier } from '../../domain/models/supplier.model';
import { SupplierRepository } from '../../domain/repositories/supplier.repository';
import { ListSuppliersUseCase } from './list-suppliers.use-case';

describe('ListSuppliersUseCase', () => {
  const suppliers: Supplier[] = [
    { nit: '900123456-1', name: 'Distribuidora Tech', email: 'ventas@tech.com', phone: '3001234567' },
  ];
  let repository: jasmine.SpyObj<SupplierRepository>;
  let useCase: ListSuppliersUseCase;

  beforeEach(() => {
    repository = jasmine.createSpyObj<SupplierRepository>('SupplierRepository', ['getAll', 'getByNit', 'register']);
    TestBed.configureTestingModule({
      providers: [ListSuppliersUseCase, { provide: SupplierRepository, useValue: repository }],
    });
    useCase = TestBed.inject(ListSuppliersUseCase);
  });

  it('debe devolver los proveedores del repositorio', (done) => {
    repository.getAll.and.returnValue(of(suppliers));

    useCase.execute().subscribe((result) => {
      expect(result).toEqual(suppliers);
      expect(repository.getAll).toHaveBeenCalledTimes(1);
      done();
    });
  });
});