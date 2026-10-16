import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable()
export class ListProductsUseCase {
  private readonly productRepository = inject(ProductRepository);

  execute(): Observable<Product[]> {
    return this.productRepository.getAll();
  }
}