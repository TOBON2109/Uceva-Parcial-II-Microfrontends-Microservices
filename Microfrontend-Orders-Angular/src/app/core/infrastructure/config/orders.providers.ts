import { provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, Provider } from '@angular/core';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.use-case';
import { GetOrderByIdUseCase } from '../../application/use-cases/get-order-by-id.use-case';
import { ListOrdersUseCase } from '../../application/use-cases/list-orders.use-case';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { HttpOrderRepository } from '../repositories/http-order.repository';

export const ORDERS_PROVIDERS: Array<Provider | EnvironmentProviders> = [
  provideHttpClient(),
  { provide: OrderRepository, useClass: HttpOrderRepository },
  ListOrdersUseCase,
  CreateOrderUseCase,
  GetOrderByIdUseCase,
];