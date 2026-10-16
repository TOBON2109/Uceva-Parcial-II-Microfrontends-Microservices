import { Routes } from '@angular/router';

export type RemoteLoader = (options: {
  type: 'module';
  remoteEntry: string;
  exposedModule: string;
}) => Promise<any>;

export const createRemoteRoutesLoader =
  (load: RemoteLoader) =>
  (remoteEntry: string) =>
  () =>
    load({ type: 'module', remoteEntry, exposedModule: './Routes' }).then(
      (module) => module.routes as Routes,
    );