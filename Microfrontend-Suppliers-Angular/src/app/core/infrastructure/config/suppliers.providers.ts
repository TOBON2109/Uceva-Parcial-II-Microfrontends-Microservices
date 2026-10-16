import { provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { GetSupplierByNitUseCase } from '../../application/use-cases/get-supplier-by-nit.use-case';
import { ListSuppliersUseCase } from '../../application/use-cases/list-suppliers.use-case';
import { RegisterSupplierUseCase } from '../../application/use-cases/register-supplier.use-case';
import { SupplierRepository } from '../../domain/repositories/supplier.repository';
import { HttpSupplierRepository } from '../repositories/http-supplier.repository';

export const SUPPLIERS_PROVIDERS: Array<Provider | EnvironmentProviders> = [
  provideHttpClient(),
  { provide: SupplierRepository, useClass: HttpSupplierRepository },
  ListSuppliersUseCase,
  RegisterSupplierUseCase,
  GetSupplierByNitUseCase,
];