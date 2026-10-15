const itemSchema = {
  type: 'object',
  properties: {
    productCode: { type: 'string', example: 'P001' },
    quantity: { type: 'integer', example: 10 },
    unitPrice: { type: 'number', example: 100000 },
  },
};

const orderSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', example: 1 },
    supplierNit: { type: 'string', example: '900123456-1' },
    items: { type: 'array', items: itemSchema },
    total: { type: 'number', example: 1000000 },
    status: { type: 'string', example: 'PENDIENTE' },
    createdAt: { type: 'string', example: '2026-10-01T10:00:00.000Z' },
  },
};

const createOrderSchema = {
  type: 'object',
  required: ['supplierNit', 'items'],
  properties: {
    supplierNit: { type: 'string', example: '900123456-1' },
    items: { type: 'array', items: itemSchema },
  },
};

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Microservicio de Órdenes de Compra',
    version: '1.0.0',
    description: 'API de órdenes de compra del sistema de Inventario / Almacén',
  },
  servers: [{ url: 'http://localhost:3003' }],
  paths: {
    '/api/orders': {
      get: {
        summary: 'Listar órdenes',
        responses: {
          200: {
            description: 'Lista de órdenes',
            content: { 'application/json': { schema: { type: 'array', items: orderSchema } } },
          },
        },
      },
      post: {
        summary: 'Crear orden',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: createOrderSchema } },
        },
        responses: {
          201: { description: 'Orden creada', content: { 'application/json': { schema: orderSchema } } },
          400: { description: 'Datos inválidos' },
        },
      },
    },
    '/api/orders/{id}': {
      get: {
        summary: 'Consultar orden por ID',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Orden encontrada', content: { 'application/json': { schema: orderSchema } } },
          400: { description: 'ID inválido' },
          404: { description: 'Orden no encontrada' },
        },
      },
    },
  },
};