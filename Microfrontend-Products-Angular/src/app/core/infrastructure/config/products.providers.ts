import { provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { GetProductByCodeUseCase } from '../../application/use-cases/get-product-by-code.use-case';
import { ListProductsUseCase } from '../../application/use-cases/list-products.use-case';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { HttpProductRepository } from '../repositories/http-product.repository';

export const PRODUCTS_PROVIDERS: Array<Provider | EnvironmentProviders> = [
  provideHttpClient(),
  { provide: ProductRepository, useClass: HttpProductRepository },
  ListProductsUseCase,
  CreateProductUseCase,
  GetProductByCodeUseCase,
];