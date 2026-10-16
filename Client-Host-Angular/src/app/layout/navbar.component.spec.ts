import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  it('debe mostrar los enlaces a los tres microfrontends', () => {
    TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();

    const links: HTMLAnchorElement[] = Array.from(fixture.nativeElement.querySelectorAll('nav a'));
    expect(links.map((link) => link.textContent?.trim())).toEqual(['Productos', 'Proveedores', 'Órdenes']);
  });
});