# 🧾 Microfrontend de Órdenes de Compra (Angular)

- Microfrontend del sistema de Inventario / Almacén, desarrollado con Angular 20.3.14 y Webpack Module Federation.
- Aplica Clean Architecture y es integrado por `Client-Host-Angular`.
- Consume el microservicio `Microservice-Orders-NodeJS` (`http://localhost:3003/api/orders`).

## 🏗️ Arquitectura (Clean Architecture)

```
src/app
│
├── core
│   ├── domain
│   │   ├── models
│   │   │   └── order.model.ts
│   │   └── repositories
│   │       └── order.repository.ts
│   ├── application
│   │   └── use-cases
│   │       ├── list-orders.use-case.ts
│   │       ├── create-order.use-case.ts
│   │       └── get-order-by-id.use-case.ts
│   └── infrastructure
│       ├── config
│       │   ├── api.config.ts
│       │   └── orders.providers.ts
│       └── repositories
│           └── http-order.repository.ts
│
├── presentation
│   ├── layout
│   │   └── orders-layout.component.ts
│   ├── pages
│   │   ├── order-list.component.ts
│   │   ├── order-form.component.ts
│   │   └── order-search.component.ts
│   └── shared
│       └── shared.scss
│
├── app.routes.ts
└── app.ts
```

- **domain:** modelos `Order`, `OrderItem` y contrato `OrderRepository`. No depende de Angular.
- **application:** casos de uso que dependen solo del contrato del repositorio.
- **infrastructure:** implementación HTTP del repositorio y proveedores de dependencias, que viajan con las rutas del microfrontend.
- **presentation:** layout y páginas que usan únicamente los casos de uso.

## 🧩 Casos de Uso

| Caso de uso | Descripción |
| --- | --- |
| ListOrdersUseCase | Lista las órdenes de compra |
| CreateOrderUseCase | Crea una orden con uno o varios ítems |
| GetOrderByIdUseCase | Consulta una orden por su ID |

## 🔌 Integración

| Dato | Valor |
| --- | --- |
| Nombre del remote | `mf-orders` |
| Puerto | `4203` |
| Remote entry | `http://localhost:4203/remoteEntry.js` |
| Módulo expuesto | `./Routes` (`src/app/app.routes.ts`) |
| Microservicio consumido | `Microservice-Orders-NodeJS` en el puerto `3003` |

## 📋 Requisitos Previos

- Node.js 20.19+ (o 22.12+)
- npm
- Google Chrome (para las pruebas)
- Microservicio de Órdenes en ejecución

## 🚀 Ejecución

### 1️⃣ Instalar Dependencias

- Ubícate en la raíz de `Microfrontend-Orders-Angular` y ejecuta: `npm i`

### 2️⃣ Ejecutar el Proyecto

- Ejecuta el comando: `npm start`

### 3️⃣ Verificar Funcionamiento

- Corriendo en: `http://localhost:4203`
- Remote entry: `http://localhost:4203/remoteEntry.js`

## 🧪 Pruebas Unitarias

- Ejecuta: `npm test -- --no-watch --code-coverage --browsers=ChromeHeadless`
- El reporte de cobertura se genera en la carpeta `coverage/`.

## 📚 Documentación Técnica (Compodoc)

- Generar: `npm run compodoc`
- Ver: `npx compodoc -s -d documentation` y abrir `http://localhost:8080`