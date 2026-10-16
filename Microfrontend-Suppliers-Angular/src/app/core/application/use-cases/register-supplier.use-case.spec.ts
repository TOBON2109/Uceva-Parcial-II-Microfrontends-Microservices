import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Supplier } from '../../domain/models/supplier.model';
import { SupplierRepository } from '../../domain/repositories/supplier.repository';
import { RegisterSupplierUseCase } from './register-supplier.use-case';

describe('RegisterSupplierUseCase', () => {
  const supplier: Supplier = { nit: '902222333-4', name: 'Ferretería Central', email: 'v@ferre.com', phone: '3151112233' };
  let repository: jasmine.SpyObj<SupplierRepository>;
  let useCase: RegisterSupplierUseCase;

  beforeEach(() => {
    repository = jasmine.createSpyObj<SupplierRepository>('SupplierRepository', ['getAll', 'getByNit', 'register']);
    TestBed.configureTestingModule({
      providers: [RegisterSupplierUseCase, { provide: SupplierRepository, useValue: repository }],
    });
    useCase = TestBed.inject(RegisterSupplierUseCase);
  });

  it('debe registrar el proveedor mediante el repositorio', (done) => {
    repository.register.and.returnValue(of(supplier));

    useCase.execute(supplier).subscribe((result) => {
      expect(result).toEqual(supplier);
      expect(repository.register).toHaveBeenCalledWith(supplier);
      done();
    });
  });
});