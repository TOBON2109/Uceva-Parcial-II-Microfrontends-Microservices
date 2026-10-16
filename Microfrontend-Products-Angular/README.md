# 📦 Microfrontend de Productos (Angular)

- Microfrontend del sistema de Inventario / Almacén, desarrollado con Angular 20.3.14 y Webpack Module Federation.
- Aplica Clean Architecture y es integrado por `Client-Host-Angular`.
- Consume el microservicio `Microservice-Products-NodeJS` (`http://localhost:3001/api/products`).

## 🏗️ Arquitectura (Clean Architecture)

```
src/app
│
├── core
│   ├── domain
│   │   ├── models
│   │   │   └── product.model.ts
│   │   └── repositories
│   │       └── product.repository.ts
│   ├── application
│   │   └── use-cases
│   │       ├── list-products.use-case.ts
│   │       ├── create-product.use-case.ts
│   │       └── get-product-by-code.use-case.ts
│   └── infrastructure
│       ├── config
│       │   ├── api.config.ts
│       │   └── products.providers.ts
│       └── repositories
│           └── http-product.repository.ts
│
├── presentation
│   ├── layout
│   │   └── products-layout.component.ts
│   ├── pages
│   │   ├── product-list.component.ts
│   │   ├── product-form.component.ts
│   │   └── product-search.component.ts
│   └── shared
│       └── shared.scss
│
├── app.routes.ts
└── app.ts
```

- **domain:** modelo `Product` y contrato `ProductRepository`. No depende de Angular.
- **application:** casos de uso que dependen solo del contrato del repositorio.
- **infrastructure:** implementación HTTP del repositorio y proveedores de dependencias, que viajan con las rutas del microfrontend.
- **presentation:** layout y páginas que usan únicamente los casos de uso.

## 🧩 Casos de Uso

| Caso de uso | Descripción |
| --- | --- |
| ListProductsUseCase | Lista los productos |
| CreateProductUseCase | Crea un producto |
| GetProductByCodeUseCase | Consulta un producto por código |

## 🔌 Integración

| Dato | Valor |
| --- | --- |
| Nombre del remote | `mf-products` |
| Puerto | `4201` |
| Remote entry | `http://localhost:4201/remoteEntry.js` |
| Módulo expuesto | `./Routes` (`src/app/app.routes.ts`) |
| Microservicio consumido | `Microservice-Products-NodeJS` en el puerto `3001` |

## 📋 Requisitos Previos

- Node.js 20.19+ (o 22.12+)
- npm
- Google Chrome (para las pruebas)
- Microservicio de Productos en ejecución

## 🚀 Ejecución

### 1️⃣ Instalar Dependencias

- Ubícate en la raíz de `Microfrontend-Products-Angular` y ejecuta: `npm i`

### 2️⃣ Ejecutar el Proyecto

- Ejecuta el comando: `npm start`

### 3️⃣ Verificar Funcionamiento

- Corriendo en: `http://localhost:4201`
- Remote entry: `http://localhost:4201/remoteEntry.js`

## 🧪 Pruebas Unitarias

- Ejecuta: `npm test -- --no-watch --code-coverage --browsers=ChromeHeadless`
- El reporte de cobertura se genera en la carpeta `coverage/`.

## 📚 Documentación Técnica (Compodoc)

- Generar: `npm run compodoc`
- Ver: `npx compodoc -s -d documentation` y abrir `http://localhost:8080`