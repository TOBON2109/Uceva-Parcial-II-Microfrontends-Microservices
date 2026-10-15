import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

export abstract class ProductRepository {
  abstract getAll(): Observable<Product[]>;
  abstract getByCode(code: string): Observable<Product>;
  abstract create(product: Product): Observable<Product>;
}