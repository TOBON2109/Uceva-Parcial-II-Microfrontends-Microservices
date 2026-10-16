import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../../domain/models/supplier.model';
import { SupplierRepository } from '../../domain/repositories/supplier.repository';

@Injectable()
export class RegisterSupplierUseCase {
  private readonly supplierRepository = inject(SupplierRepository);

  execute(supplier: Supplier): Observable<Supplier> {
    return this.supplierRepository.register(supplier);
  }
}