const express = require('express');
const cors = require('cors');

const InMemoryProductRepository = require('./infrastructure/repositories/in-memory-product.repository');
const ListProductsUseCase = require('./application/use-cases/list-products.usecase');
const CreateProductUseCase = require('./application/use-cases/create-product.usecase');
const GetProductByCodeUseCase = require('./application/use-cases/get-product-by-code.usecase');
const createProductController = require('./infrastructure/http/product.controller');
const createProductRoutes = require('./infrastructure/http/product.routes');

const productRepository = new InMemoryProductRepository();

const controller = createProductController({
  listProducts: new ListProductsUseCase(productRepository),
  createProduct: new CreateProductUseCase(productRepository),
  getProductByCode: new GetProductByCodeUseCase(productRepository),
});

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/products', createProductRoutes(controller));

module.exports = app;