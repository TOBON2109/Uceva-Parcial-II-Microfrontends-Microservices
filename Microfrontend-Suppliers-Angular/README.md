# 🏭 Microfrontend de Proveedores (Angular)

- Microfrontend del sistema de Inventario / Almacén, desarrollado con Angular 20.3.14 y Webpack Module Federation.
- Aplica Clean Architecture y es integrado por `Client-Host-Angular`.
- Consume el microservicio `Microservice-Suppliers-SpringBoot` (`http://localhost:3002/api/suppliers`).

## 🏗️ Arquitectura (Clean Architecture)

```
src/app
│
├── core
│   ├── domain
│   │   ├── models
│   │   │   └── supplier.model.ts
│   │   └── repositories
│   │       └── supplier.repository.ts
│   ├── application
│   │   └── use-cases
│   │       ├── list-suppliers.use-case.ts
│   │       ├── register-supplier.use-case.ts
│   │       └── get-supplier-by-nit.use-case.ts
│   └── infrastructure
│       ├── config
│       │   ├── api.config.ts
│       │   └── suppliers.providers.ts
│       └── repositories
│           └── http-supplier.repository.ts
│
├── presentation
│   ├── layout
│   │   └── suppliers-layout.component.ts
│   ├── pages
│   │   ├── supplier-list.component.ts
│   │   ├── supplier-form.component.ts
│   │   └── supplier-search.component.ts
│   └── shared
│       └── shared.scss
│
├── app.routes.ts
└── app.ts
```

- **domain:** modelo `Supplier` y contrato `SupplierRepository`. No depende de Angular.
- **application:** casos de uso que dependen solo del contrato del repositorio.
- **infrastructure:** implementación HTTP del repositorio y proveedores de dependencias, que viajan con las rutas del microfrontend.
- **presentation:** layout y páginas que usan únicamente los casos de uso.

## 🧩 Casos de Uso

| Caso de uso | Descripción |
| --- | --- |
| ListSuppliersUseCase | Lista los proveedores |
| RegisterSupplierUseCase | Registra un proveedor |
| GetSupplierByNitUseCase | Consulta un proveedor por NIT |

## 🔌 Integración

| Dato | Valor |
| --- | --- |
| Nombre del remote | `mf-suppliers` |
| Puerto | `4202` |
| Remote entry | `http://localhost:4202/remoteEntry.js` |
| Módulo expuesto | `./Routes` (`src/app/app.routes.ts`) |
| Microservicio consumido | `Microservice-Suppliers-SpringBoot` en el puerto `3002` |

## 📋 Requisitos Previos

- Node.js 20.19+ (o 22.12+)
- npm
- Google Chrome (para las pruebas)
- Microservicio de Proveedores en ejecución

## 🚀 Ejecución

### 1️⃣ Instalar Dependencias

- Ubícate en la raíz de `Microfrontend-Suppliers-Angular` y ejecuta: `npm i`

### 2️⃣ Ejecutar el Proyecto

- Ejecuta el comando: `npm start`

### 3️⃣ Verificar Funcionamiento

- Corriendo en: `http://localhost:4202`
- Remote entry: `http://localhost:4202/remoteEntry.js`

## 🧪 Pruebas Unitarias

- Ejecuta: `npm test -- --no-watch --code-coverage --browsers=ChromeHeadless`
- El reporte de cobertura se genera en la carpeta `coverage/`.

## 📚 Documentación Técnica (Compodoc)

- Generar: `npm run compodoc`
- Ver: `npx compodoc -s -d documentation` y abrir `http://localhost:8080`