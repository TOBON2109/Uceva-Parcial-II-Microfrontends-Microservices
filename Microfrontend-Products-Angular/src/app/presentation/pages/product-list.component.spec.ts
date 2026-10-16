import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { ListProductsUseCase } from '../../core/application/use-cases/list-products.use-case';
import { Product } from '../../core/domain/models/product.model';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  const products: Product[] = [
    { code: 'P001', name: 'Teclado', description: 'USB', price: 100, stock: 5 },
    { code: 'P002', name: 'Mouse', description: 'Inalámbrico', price: 50, stock: 8 },
  ];

  function setup(result$: Observable<Product[]>): ComponentFixture<ProductListComponent> {
    TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [{ provide: ListProductsUseCase, useValue: { execute: () => result$ } }],
    });
    const fixture = TestBed.createComponent(ProductListComponent);
    fixture.detectChanges();
    fixture.detectChanges();
    return fixture;
  }

  it('debe mostrar una fila por producto', () => {
    const fixture = setup(of(products));
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('P001');
  });

  it('debe mostrar mensaje cuando no hay productos', () => {
    const fixture = setup(of([]));

    expect(fixture.nativeElement.textContent).toContain('No hay productos registrados');
  });

  it('debe mostrar mensaje de error si falla la carga', () => {
    const fixture = setup(throwError(() => new Error('fallo')));

    expect(fixture.componentInstance.error()).toBe('No se pudo cargar la lista de productos');
    expect(fixture.nativeElement.textContent).toContain('No se pudo cargar la lista de productos');
  });
});