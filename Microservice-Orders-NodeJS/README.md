# 🧾 Microservicio de Órdenes de Compra (Node.js)

- Microservicio del sistema de Inventario / Almacén, desarrollado con Node.js y Express.
- Aplica Clean Architecture y es consumido por el microfrontend `Microfrontend-Orders-Angular`.

## 🏗️ Arquitectura (Clean Architecture)

```
src
│
├── domain
│   ├── entities
│   │   └── order.js
│   ├── repositories
│   │   └── order.repository.js
│   └── errors.js
│
├── application
│   └── use-cases
│       ├── list-orders.usecase.js
│       ├── create-order.usecase.js
│       └── get-order-by-id.usecase.js
│
├── infrastructure
│   ├── repositories
│   │   └── in-memory-order.repository.js
│   └── http
│       ├── order.controller.js
│       ├── order.routes.js
│       └── swagger.js
│
├── app.js
└── server.js
```

- **domain:** entidad `Order`, errores y contrato del repositorio. No depende de nada externo.
- **application:** casos de uso que dependen solo de las interfaces del dominio.
- **infrastructure:** implementación del repositorio (en memoria), controlador, rutas y Swagger.

## 🧩 Casos de Uso

| Caso de uso | Descripción |
| --- | --- |
| ListOrdersUseCase | Lista todas las órdenes de compra |
| CreateOrderUseCase | Crea una orden (valida datos y calcula el total) |
| GetOrderByIdUseCase | Consulta una orden por su ID |

## 📋 Requisitos Previos

- Node.js
- npm

## 🚀 Ejecución

### 1️⃣ Instalar Dependencias

- Ubícate en la raíz de `Microservice-Orders-NodeJS` y ejecuta: `npm i`

### 2️⃣ Ejecutar el Proyecto

- Ejecuta el comando: `npm run start`

### 3️⃣ Verificar Funcionamiento

- Corriendo en: `http://localhost:3003`
- Swagger API Docs: `http://localhost:3003/api/docs`

## 🔌 Endpoints

| Método | URL | Descripción |
| --- | --- | --- |
| GET | `/api/orders` | Listar órdenes |
| POST | `/api/orders` | Crear orden |
| GET | `/api/orders/{id}` | Consultar orden por ID |

### Ejemplo de creación

```json
POST /api/orders
{
  "supplierNit": "900123456-1",
  "items": [
    { "productCode": "P001", "quantity": 3, "unitPrice": 120000 }
  ]
}
```

### Códigos de respuesta

| Código | Significado |
| --- | --- |
| 200 | OK |
| 201 | Orden creada |
| 400 | Datos inválidos |
| 404 | Orden no encontrada |