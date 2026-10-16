# 🖥️ Host (Angular)

- Aplicación host del sistema de Inventario / Almacén, desarrollada con Angular 20.3.14 y Webpack Module Federation.
- Integra los tres microfrontends mediante un navbar y carga sus rutas de forma remota.

## 🏗️ Estructura

```
src/app
│
├── core
│   └── config
│       └── remotes.config.ts
├── layout
│   └── navbar.component.ts
├── app.routes.ts
└── app.ts
```

- **remotes.config.ts:** URL del `remoteEntry.js` de cada microfrontend.
- **navbar.component.ts:** navbar que permite navegar entre los microfrontends.
- **app.routes.ts:** cada ruta carga el módulo expuesto `./Routes` del microfrontend con `loadRemoteModule`.

## 🔌 Microfrontends Integrados

| Ruta del host | Microfrontend | Remote entry | Microservicio que consume |
| --- | --- | --- | --- |
| `/products` | `Microfrontend-Products-Angular` | `http://localhost:4201/remoteEntry.js` | `Microservice-Products-NodeJS` (3001) |
| `/suppliers` | `Microfrontend-Suppliers-Angular` | `http://localhost:4202/remoteEntry.js` | `Microservice-Suppliers-SpringBoot` (3002) |
| `/orders` | `Microfrontend-Orders-Angular` | `http://localhost:4203/remoteEntry.js` | `Microservice-Orders-NodeJS` (3003) |

## 📋 Requisitos Previos

- Node.js 20.19+ (o 22.12+)
- npm
- Google Chrome (para las pruebas)
- Los tres microfrontends en ejecución

## 🚀 Ejecución

### 1️⃣ Instalar Dependencias

- Ubícate en la raíz de `Client-Host-Angular` y ejecuta: `npm i`

### 2️⃣ Ejecutar el Proyecto

- Ejecuta el comando: `npm start`

### 3️⃣ Verificar Funcionamiento

- Corriendo en: `http://localhost:4200`

## 🧪 Pruebas Unitarias

- Ejecuta: `npm test -- --no-watch --code-coverage --browsers=ChromeHeadless`

## 📚 Documentación Técnica (Compodoc)

- Generar: `npm run compodoc`
- Ver: `npx compodoc -s -d documentation` y abrir `http://localhost:8080`