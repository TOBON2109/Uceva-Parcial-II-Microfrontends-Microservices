import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { GetProductByCodeUseCase } from '../../core/application/use-cases/get-product-by-code.use-case';
import { Product } from '../../core/domain/models/product.model';
import { ProductSearchComponent } from './product-search.component';

describe('ProductSearchComponent', () => {
  const product: Product = { code: 'P001', name: 'Teclado', description: 'USB', price: 100, stock: 5 };

  function setup(result$: Observable<Product>): ProductSearchComponent {
    TestBed.configureTestingModule({
      imports: [ProductSearchComponent],
      providers: [{ provide: GetProductByCodeUseCase, useValue: { execute: () => result$ } }],
    });
    const fixture = TestBed.createComponent(ProductSearchComponent);
    fixture.detectChanges();
    return fixture.componentInstance;
  }

  it('debe mostrar el producto encontrado', () => {
    const component = setup(of(product));
    component.code = 'P001';

    component.search();

    expect(component.product()).toEqual(product);
    expect(component.error()).toBe('');
  });

  it('debe mostrar el mensaje de error del backend', () => {
    const component = setup(throwError(() => ({ error: { message: 'No existe un producto' } })));

    component.search();

    expect(component.product()).toBeNull();
    expect(component.error()).toBe('No existe un producto');
  });

  it('debe mostrar un mensaje genérico si el error no trae mensaje', () => {
    const component = setup(throwError(() => ({})));

    component.search();

    expect(component.error()).toBe('No se pudo consultar el producto');
  });
});