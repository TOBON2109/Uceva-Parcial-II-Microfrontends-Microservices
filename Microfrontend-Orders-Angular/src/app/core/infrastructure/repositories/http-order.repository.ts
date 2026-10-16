import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrderRequest, Order } from '../../domain/models/order.model';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { ORDERS_API_URL } from '../config/api.config';

@Injectable()
export class HttpOrderRepository extends OrderRepository {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(ORDERS_API_URL);
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${ORDERS_API_URL}/${id}`);
  }

  create(request: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(ORDERS_API_URL, request);
  }
}