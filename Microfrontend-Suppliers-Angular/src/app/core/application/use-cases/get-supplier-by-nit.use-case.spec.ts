import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Supplier } from '../../domain/models/supplier.model';
import { SupplierRepository } from '../../domain/repositories/supplier.repository';
import { GetSupplierByNitUseCase } from './get-supplier-by-nit.use-case';

describe('GetSupplierByNitUseCase', () => {
  const supplier: Supplier = { nit: '900123456-1', name: 'Distribuidora Tech', email: 'ventas@tech.com', phone: '3001234567' };
  let repository: jasmine.SpyObj<SupplierRepository>;
  let useCase: GetSupplierByNitUseCase;

  beforeEach(() => {
    repository = jasmine.createSpyObj<SupplierRepository>('SupplierRepository', ['getAll', 'getByNit', 'register']);
    TestBed.configureTestingModule({
      providers: [GetSupplierByNitUseCase, { provide: SupplierRepository, useValue: repository }],
    });
    useCase = TestBed.inject(GetSupplierByNitUseCase);
  });

  it('debe consultar el proveedor sin espacios en el NIT', (done) => {
    repository.getByNit.and.returnValue(of(supplier));

    useCase.execute('  900123456-1  ').subscribe((result) => {
      expect(result).toEqual(supplier);
      expect(repository.getByNit).toHaveBeenCalledWith('900123456-1');
      done();
    });
  });
});