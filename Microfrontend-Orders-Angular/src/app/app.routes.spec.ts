import { routes } from './app.routes';

describe('routes', () => {
  it('debe definir el layout con las tres páginas de órdenes', () => {
    expect(routes.length).toBe(1);
    expect(routes[0].providers?.length).toBeGreaterThan(0);
    expect(routes[0].children?.map((route) => route.path)).toEqual(['', 'new', 'search']);
  });
});