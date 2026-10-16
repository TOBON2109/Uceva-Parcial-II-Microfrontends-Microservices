import { createRemoteRoutesLoader } from './remote-loader';

describe('createRemoteRoutesLoader', () => {
  it('debe cargar el módulo ./Routes del remoto y devolver sus rutas', async () => {
    const remoteRoutes = [{ path: '' }];
    const load = jasmine.createSpy('load').and.resolveTo({ routes: remoteRoutes });

    const routes = await createRemoteRoutesLoader(load)('http://localhost:4201/remoteEntry.js')();

    expect(load).toHaveBeenCalledWith({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './Routes',
    });
    expect(routes).toEqual(remoteRoutes);
  });
});