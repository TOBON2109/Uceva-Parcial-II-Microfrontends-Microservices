import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';

@Injectable()
export class GetProductByCodeUseCase {
  private readonly productRepository = inject(ProductRepository);

  execute(code: string): Observable<Product> {
    return this.productRepository.getByCode(code.trim());
  }
}