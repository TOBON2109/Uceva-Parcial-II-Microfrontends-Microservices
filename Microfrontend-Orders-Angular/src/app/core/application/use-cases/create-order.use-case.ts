import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrderRequest, Order } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';

@Injectable()
export class CreateOrderUseCase {
  private readonly orderRepository = inject(OrderRepository);

  execute(request: CreateOrderRequest): Observable<Order> {
    return this.orderRepository.create(request);
  }
}