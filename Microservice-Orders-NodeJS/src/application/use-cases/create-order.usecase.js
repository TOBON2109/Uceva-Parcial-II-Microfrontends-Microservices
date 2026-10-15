const Order = require('../../domain/entities/order');

class CreateOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(data) {
    const order = Order.create(data);
    return this.orderRepository.save(order);
  }
}

module.exports = CreateOrderUseCase;