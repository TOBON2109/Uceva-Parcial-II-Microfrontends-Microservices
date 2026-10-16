import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductsLayoutComponent } from './products-layout.component';

describe('ProductsLayoutComponent', () => {
  it('debe mostrar el título y los tres enlaces de navegación', () => {
    TestBed.configureTestingModule({
      imports: [ProductsLayoutComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(ProductsLayoutComponent);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h2')?.textContent).toContain('Productos');
    expect(element.querySelectorAll('nav a').length).toBe(3);
  });
});