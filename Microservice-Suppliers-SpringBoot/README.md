# 🏭 Microservicio de Proveedores (Spring Boot)

- Microservicio del sistema de Inventario / Almacén, desarrollado con Spring Boot.
- Aplica Clean Architecture y es consumido por el microfrontend `Microfrontend-Suppliers-Angular`.

## 🏗️ Arquitectura (Clean Architecture)

```
src/main/java/com/uceva/suppliers
│
├── domain
│   ├── entities
│   │   └── Supplier.java
│   ├── repositories
│   │   └── SupplierRepository.java
│   └── exceptions
│       ├── DomainValidationException.java
│       ├── ResourceNotFoundException.java
│       └── ResourceConflictException.java
│
├── application
│   └── usecases
│       ├── ListSuppliersUseCase.java
│       ├── RegisterSupplierUseCase.java
│       └── GetSupplierByNitUseCase.java
│
├── infrastructure
│   ├── config
│   │   ├── AppConfig.java
│   │   └── OpenApiConfig.java
│   ├── repositories
│   │   └── InMemorySupplierRepository.java
│   └── controllers
│       ├── SupplierController.java
│       ├── GlobalExceptionHandler.java
│       └── dto
│           └── SupplierRequest.java
│
└── SuppliersApplication.java
```

- **domain:** entidad `Supplier`, excepciones y contrato del repositorio. No depende de Spring.
- **application:** casos de uso que dependen solo de las interfaces del dominio.
- **infrastructure:** repositorio en memoria, controlador REST, manejo de errores y configuración. `AppConfig` conecta los casos de uso con la implementación del repositorio (inyección de dependencias).

## 🧩 Casos de Uso

| Caso de uso | Descripción |
| --- | --- |
| ListSuppliersUseCase | Lista todos los proveedores |
| RegisterSupplierUseCase | Registra un proveedor (valida datos y NIT único) |
| GetSupplierByNitUseCase | Consulta un proveedor por su NIT |

## 📋 Requisitos Previos

- Java (misma versión configurada en el `pom.xml`)
- Maven (se incluye el wrapper `mvnw`, no es necesario instalarlo)

## 🚀 Ejecución

### 1️⃣ Ejecutar el Proyecto

- Ubícate en la raíz de `Microservice-Suppliers-SpringBoot` y ejecuta: `.\mvnw spring-boot:run` (en Linux/Mac: `./mvnw spring-boot:run`)

### 2️⃣ Verificar Funcionamiento

- Corriendo en: `http://localhost:3002/api`
- Swagger API Docs: `http://localhost:3002/api/docs`

## 🔌 Endpoints

| Método | URL | Descripción |
| --- | --- | --- |
| GET | `/api/suppliers` | Listar proveedores |
| POST | `/api/suppliers` | Registrar proveedor |
| GET | `/api/suppliers/{nit}` | Consultar proveedor por NIT |

### Ejemplo de registro

```json
POST /api/suppliers
{
  "nit": "902222333-4",
  "name": "Ferretería Central",
  "email": "ventas@ferrecentral.com",
  "phone": "3151112233"
}
```

### Códigos de respuesta

| Código | Significado |
| --- | --- |
| 200 | OK |
| 201 | Proveedor registrado |
| 400 | Datos inválidos |
| 404 | Proveedor no encontrado |
| 409 | NIT duplicado |