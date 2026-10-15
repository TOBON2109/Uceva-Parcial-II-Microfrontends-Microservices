const express = require('express');
const cors = require('cors');

const InMemoryOrderRepository = require('./infrastructure/repositories/in-memory-order.repository');
const ListOrdersUseCase = require('./application/use-cases/list-orders.usecase');
const CreateOrderUseCase = require('./application/use-cases/create-order.usecase');
const GetOrderByIdUseCase = require('./application/use-cases/get-order-by-id.usecase');
const createOrderController = require('./infrastructure/http/order.controller');
const createOrderRoutes = require('./infrastructure/http/order.routes');

const orderRepository = new InMemoryOrderRepository();

const controller = createOrderController({
  listOrders: new ListOrdersUseCase(orderRepository),
  createOrder: new CreateOrderUseCase(orderRepository),
  getOrderById: new GetOrderByIdUseCase(orderRepository),
});

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/orders', createOrderRoutes(controller));

module.exports = app;