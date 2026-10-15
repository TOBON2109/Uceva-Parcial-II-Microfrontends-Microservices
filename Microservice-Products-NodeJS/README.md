# 📦 Microservicio de Productos (Node.js)

- Microservicio del sistema de Inventario / Almacén, desarrollado con Node.js y Express.
- Aplica Clean Architecture y es consumido por el microfrontend `Microfrontend-Products-Angular`.

## 🏗️ Arquitectura (Clean Architecture)

```
src
│
├── domain
│   ├── entities
│   │   └── product.js
│   ├── repositories
│   │   └── product.repository.js
│   └── errors.js
│
├── application
│   └── use-cases
│       ├── list-products.usecase.js
│       ├── create-product.usecase.js
│       └── get-product-by-code.usecase.js
│
├── infrastructure
│   ├── repositories
│   │   └── in-memory-product.repository.js
│   └── http
│       ├── product.controller.js
│       ├── product.routes.js
│       └── swagger.js
│
├── app.js
└── server.js
```

- **domain:** entidad `Product`, errores y contrato del repositorio. No depende de nada externo.
- **application:** casos de uso que dependen solo de las interfaces del dominio.
- **infrastructure:** implementación del repositorio (en memoria), controlador, rutas y Swagger.

## 🧩 Casos de Uso

| Caso de uso | Descripción |
| --- | --- |
| ListProductsUseCase | Lista todos los productos |
| CreateProductUseCase | Crea un producto (valida datos y código único) |
| GetProductByCodeUseCase | Consulta un producto por su código |

## 📋 Requisitos Previos

- Node.js
- npm

## 🚀 Ejecución

### 1️⃣ Instalar Dependencias

- Ubícate en la raíz de `Microservice-Products-NodeJS` y ejecuta: `npm i`

### 2️⃣ Ejecutar el Proyecto

- Ejecuta el comando: `npm run start`

### 3️⃣ Verificar Funcionamiento

- Corriendo en: `http://localhost:3001`
- Swagger API Docs: `http://localhost:3001/api/docs`

## 🔌 Endpoints

| Método | URL | Descripción |
| --- | --- | --- |
| GET | `/api/products` | Listar productos |
| POST | `/api/products` | Crear producto |
| GET | `/api/products/{code}` | Consultar producto por código |

### Ejemplo de creación

```json
POST /api/products
{
  "code": "P004",
  "name": "Cable HDMI",
  "description": "Cable HDMI 2 metros",
  "price": 15000,
  "stock": 50
}
```

### Códigos de respuesta

| Código | Significado |
| --- | --- |
| 200 | OK |
| 201 | Producto creado |
| 400 | Datos inválidos |
| 404 | Producto no encontrado |
| 409 | Código duplicado |