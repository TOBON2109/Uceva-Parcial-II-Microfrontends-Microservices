import { routes } from './app.routes';

describe('routes', () => {
  it('debe redirigir la raíz a productos', () => {
    const root = routes.find((route) => route.path === '');

    expect(root?.redirectTo).toBe('products');
  });

  it('debe cargar de forma remota los tres microfrontends', () => {
    const remotes = routes.filter((route) => ['products', 'suppliers', 'orders'].includes(route.path ?? ''));

    expect(remotes.length).toBe(3);
    remotes.forEach((route) => expect(route.loadChildren).toBeDefined());
  });
});