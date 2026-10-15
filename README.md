# 🧪 Parcial II: Microfrontends y Microservices - Inventario / Almacén

- Proyecto desarrollado para la asignatura de Arquitectura de Software (UCEVA).
- El objetivo es implementar una arquitectura de microfrontends con Angular y Module Federation, integrada con microservicios en Node.js y Spring Boot, aplicando Clean Architecture.

## 📦 Estructura del Proyecto

| Proyecto | Tecnología | Puerto |
| --- | --- | --- |
| Client-Host-Angular | Angular | 4200 |
| Microfrontend-Products-Angular | Angular | 4201 |
| Microfrontend-Suppliers-Angular | Angular | 4202 |
| Microfrontend-Orders-Angular | Angular | 4203 |
| Microservice-Products-NodeJS | Node.js | 3001 |
| Microservice-Suppliers-SpringBoot | Spring Boot | 3002 |
| Microservice-Orders-NodeJS | Node.js | 3003 |

## 🔗 Consumo de Microservicios

| Microfrontend | Microservicio que consume | Puerto |
| --- | --- | --- |
| Microfrontend-Products-Angular | Microservice-Products-NodeJS | 3001 |
| Microfrontend-Suppliers-Angular | Microservice-Suppliers-SpringBoot | 3002 |
| Microfrontend-Orders-Angular | Microservice-Orders-NodeJS | 3003 |

## 📋 Requisitos Previos

- Node.js
- npm
- Angular CLI
- Java y Maven
- Git
- Visual Studio Code

> Las instrucciones de instalación, ejecución y verificación se irán complementando a medida que se desarrolla el proyecto.