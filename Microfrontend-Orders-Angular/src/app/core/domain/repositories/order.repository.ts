import { Observable } from 'rxjs';
import { CreateOrderRequest, Order } from '../models/order.model';

export abstract class OrderRepository {
  abstract getAll(): Observable<Order[]>;
  abstract getById(id: number): Observable<Order>;
  abstract create(request: CreateOrderRequest): Observable<Order>;
}