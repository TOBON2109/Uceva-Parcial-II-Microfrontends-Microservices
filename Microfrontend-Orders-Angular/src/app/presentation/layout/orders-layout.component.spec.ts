import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { OrdersLayoutComponent } from './orders-layout.component';

describe('OrdersLayoutComponent', () => {
  it('debe mostrar el título y los tres enlaces de navegación', () => {
    TestBed.configureTestingModule({
      imports: [OrdersLayoutComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(OrdersLayoutComponent);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h2')?.textContent).toContain('Órdenes de compra');
    expect(element.querySelectorAll('nav a').length).toBe(3);
  });
});