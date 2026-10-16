import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { CreateProductUseCase } from '../../core/application/use-cases/create-product.use-case';
import { Product } from '../../core/domain/models/product.model';
import { ProductFormComponent } from './product-form.component';

describe('ProductFormComponent', () => {
  const product: Product = { code: 'P004', name: 'Cable', description: 'HDMI', price: 15000, stock: 50 };

  function setup(result$: Observable<Product>): ProductFormComponent {
    TestBed.configureTestingModule({
      imports: [ProductFormComponent],
      providers: [{ provide: CreateProductUseCase, useValue: { execute: () => result$ } }],
    });
    const fixture = TestBed.createComponent(ProductFormComponent);
    fixture.detectChanges();
    return fixture.componentInstance;
  }

  it('debe crear el producto y limpiar el formulario', () => {
    const component = setup(of(product));
    component.product = { ...product };

    component.submit();

    expect(component.message()).toBe('Producto P004 creado correctamente');
    expect(component.error()).toBe('');
    expect(component.product.code).toBe('');
  });

  it('debe mostrar el mensaje de error del backend', () => {
    const component = setup(throwError(() => ({ error: { message: 'Código duplicado' } })));

    component.submit();

    expect(component.error()).toBe('Código duplicado');
    expect(component.message()).toBe('');
  });

  it('debe mostrar un mensaje genérico si el error no trae mensaje', () => {
    const component = setup(throwError(() => ({})));

    component.submit();

    expect(component.error()).toBe('No se pudo crear el producto');
  });
});