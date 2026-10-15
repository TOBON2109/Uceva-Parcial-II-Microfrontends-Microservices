const { NotFoundError, ValidationError } = require('../../domain/errors');

class GetOrderByIdUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(id) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0) {
      throw new ValidationError('El ID debe ser un entero positivo');
    }
    const order = await this.orderRepository.findById(numericId);
    if (!order) {
      throw new NotFoundError(`No existe una orden con el ID ${numericId}`);
    }
    return order;
  }
}

module.exports = GetOrderByIdUseCase;