import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';

@Injectable()
export class GetOrderByIdUseCase {
  private readonly orderRepository = inject(OrderRepository);

  execute(id: number): Observable<Order> {
    return this.orderRepository.getById(id);
  }
}