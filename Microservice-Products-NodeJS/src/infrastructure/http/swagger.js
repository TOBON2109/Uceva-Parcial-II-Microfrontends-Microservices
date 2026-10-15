const productSchema = {
  type: 'object',
  properties: {
    code: { type: 'string', example: 'P001' },
    name: { type: 'string', example: 'Teclado mecánico' },
    description: { type: 'string', example: 'Teclado USB' },
    price: { type: 'number', example: 120000 },
    stock: { type: 'integer', example: 25 },
  },
};

module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Microservicio de Productos',
    version: '1.0.0',
    description: 'API de productos del sistema de Inventario / Almacén',
  },
  servers: [{ url: 'http://localhost:3001' }],
  paths: {
    '/api/products': {
      get: {
        summary: 'Listar productos',
        responses: {
          200: {
            description: 'Lista de productos',
            content: { 'application/json': { schema: { type: 'array', items: productSchema } } },
          },
        },
      },
      post: {
        summary: 'Crear producto',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: productSchema } },
        },
        responses: {
          201: { description: 'Producto creado', content: { 'application/json': { schema: productSchema } } },
          400: { description: 'Datos inválidos' },
          409: { description: 'Código duplicado' },
        },
      },
    },
    '/api/products/{code}': {
      get: {
        summary: 'Consultar producto por código',
        parameters: [{ name: 'code', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Producto encontrado', content: { 'application/json': { schema: productSchema } } },
          404: { description: 'Producto no encontrado' },
        },
      },
    },
  },
};