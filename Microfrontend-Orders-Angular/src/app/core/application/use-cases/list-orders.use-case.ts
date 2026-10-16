import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';

@Injectable()
export class ListOrdersUseCase {
  private readonly orderRepository = inject(OrderRepository);

  execute(): Observable<Order[]> {
    return this.orderRepository.getAll();
  }
}