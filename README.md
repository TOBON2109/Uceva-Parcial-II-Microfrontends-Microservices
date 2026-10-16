# 🧪 Parcial II: Microfrontends y Microservices - Inventario / Almacén

- Proyecto desarrollado para la asignatura de Arquitectura de Software (UCEVA).
- Solución distribuida con un **host** Angular que integra **tres microfrontends** (Angular + Module Federation), cada uno conectado a su propio **microservicio** (Node.js o Spring Boot). Todos aplican Clean Architecture.

## 🏗️ Arquitectura

```
                    ┌─► Microfrontend-Products-Angular  ──► Microservice-Products-NodeJS
Client-Host-Angular ├─► Microfrontend-Suppliers-Angular ──► Microservice-Suppliers-SpringBoot
                    └─► Microfrontend-Orders-Angular    ──► Microservice-Orders-NodeJS
```

## 📦 Estructura del Proyecto y Puertos

| Proyecto | Tecnología | Puerto |
| --- | --- | --- |
| Client-Host-Angular | Angular 20 | 4200 |
| Microfrontend-Products-Angular | Angular 20 | 4201 |
| Microfrontend-Suppliers-Angular | Angular 20 | 4202 |
| Microfrontend-Orders-Angular | Angular 20 | 4203 |
| Microservice-Products-NodeJS | Node.js + Express | 3001 |
| Microservice-Suppliers-SpringBoot | Spring Boot | 3002 |
| Microservice-Orders-NodeJS | Node.js + Express | 3003 |

## 🔗 Consumo de Microservicios

| Microfrontend | Microservicio que consume | Puerto | Endpoint base |
| --- | --- | --- | --- |
| Microfrontend-Products-Angular | Microservice-Products-NodeJS | 3001 | `http://localhost:3001/api/products` |
| Microfrontend-Suppliers-Angular | Microservice-Suppliers-SpringBoot | 3002 | `http://localhost:3002/api/suppliers` |
| Microfrontend-Orders-Angular | Microservice-Orders-NodeJS | 3003 | `http://localhost:3003/api/orders` |

## 🧩 Casos de Uso

| Módulo | Casos de uso del microfrontend | Casos de uso del microservicio |
| --- | --- | --- |
| Productos | ListProducts, CreateProduct, GetProductByCode | ListProducts, CreateProduct, GetProductByCode |
| Proveedores | ListSuppliers, RegisterSupplier, GetSupplierByNit | ListSuppliers, RegisterSupplier, GetSupplierByNit |
| Órdenes de compra | ListOrders, CreateOrder, GetOrderById | ListOrders, CreateOrder, GetOrderById |

Total: 9 casos de uso en el frontend y 9 en el backend.

## 📋 Requisitos Previos

- Node.js 20.19+ (o 22.12+) y npm
- Java 21 (Maven se incluye con el wrapper `mvnw`)
- Google Chrome (para las pruebas unitarias)
- Git

## 🚀 Ejecución

### 1️⃣ Instalar Dependencias

Ubícate en la raíz de cada proyecto y ejecuta `npm i` en:

- `Microservice-Products-NodeJS`
- `Microservice-Orders-NodeJS`
- `Microfrontend-Products-Angular`
- `Microfrontend-Suppliers-Angular`
- `Microfrontend-Orders-Angular`
- `Client-Host-Angular`

`Microservice-Suppliers-SpringBoot` no requiere instalación previa.

### 2️⃣ Ejecutar los Proyectos

Cada proyecto se ejecuta en su propia terminal. Orden recomendado: microservicios, microfrontends y, al final, el host.

| # | Proyecto | Comando |
| --- | --- | --- |
| 1 | Microservice-Products-NodeJS | `npm run start` |
| 2 | Microservice-Suppliers-SpringBoot | `.\mvnw spring-boot:run` (Linux/Mac: `./mvnw spring-boot:run`) |
| 3 | Microservice-Orders-NodeJS | `npm run start` |
| 4 | Microfrontend-Products-Angular | `npm start` |
| 5 | Microfrontend-Suppliers-Angular | `npm start` |
| 6 | Microfrontend-Orders-Angular | `npm start` |
| 7 | Client-Host-Angular | `npm start` |

### 3️⃣ Verificar Funcionamiento

- Aplicación completa (host): `http://localhost:4200`
- Remote entries: `http://localhost:4201/remoteEntry.js`, `http://localhost:4202/remoteEntry.js`, `http://localhost:4203/remoteEntry.js`
- Swagger Productos: `http://localhost:3001/api/docs`
- Swagger Proveedores: `http://localhost:3002/api/docs`
- Swagger Órdenes: `http://localhost:3003/api/docs`
- Las conexiones se pueden verificar en la pestaña **Network** del navegador: cada módulo consume su microservicio.

## 🧪 Pruebas Unitarias

En la raíz de cada proyecto Angular:

```
npm test -- --no-watch --code-coverage --browsers=ChromeHeadless
```

Los tres microfrontends superan el 90% de cobertura. El reporte se genera en `coverage/`.

## 📚 Documentación Técnica

- **Frontend (Compodoc):** `npm run compodoc` y luego `npx compodoc -s -d documentation` (abre `http://localhost:8080`).
- **Backend:** Swagger en `/api/docs` de cada microservicio.
- Cada proyecto incluye su propio `README.md` con arquitectura, casos de uso y ejecución.

## 📝 Estándar de Commits

Formato: `tipo(alcance): descripción`

| Tipo | Uso |
| --- | --- |
| feat | Nueva funcionalidad |
| fix | Corrección de errores |
| docs | Documentación |
| test | Pruebas |
| refactor | Reorganización sin cambiar comportamiento |
| chore / build | Configuración y dependencias |

Alcances: `host`, `mf-products`, `mf-suppliers`, `mf-orders`, `ms-products`, `ms-suppliers`, `ms-orders`, `repo`.