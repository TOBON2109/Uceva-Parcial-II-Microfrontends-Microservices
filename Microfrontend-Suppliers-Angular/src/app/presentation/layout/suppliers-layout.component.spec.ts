import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SuppliersLayoutComponent } from './suppliers-layout.component';

describe('SuppliersLayoutComponent', () => {
  it('debe mostrar el título y los tres enlaces de navegación', () => {
    TestBed.configureTestingModule({
      imports: [SuppliersLayoutComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(SuppliersLayoutComponent);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h2')?.textContent).toContain('Proveedores');
    expect(element.querySelectorAll('nav a').length).toBe(3);
  });
});