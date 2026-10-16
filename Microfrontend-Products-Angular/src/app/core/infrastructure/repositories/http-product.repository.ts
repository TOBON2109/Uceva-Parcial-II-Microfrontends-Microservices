import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { PRODUCTS_API_URL } from '../config/api.config';

@Injectable()
export class HttpProductRepository extends ProductRepository {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_API_URL);
  }

  getByCode(code: string): Observable<Product> {
    return this.http.get<Product>(`${PRODUCTS_API_URL}/${encodeURIComponent(code)}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(PRODUCTS_API_URL, product);
  }
}