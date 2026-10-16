import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../../domain/models/supplier.model';
import { SupplierRepository } from '../../domain/repositories/supplier.repository';

@Injectable()
export class GetSupplierByNitUseCase {
  private readonly supplierRepository = inject(SupplierRepository);

  execute(nit: string): Observable<Supplier> {
    return this.supplierRepository.getByNit(nit.trim());
  }
}