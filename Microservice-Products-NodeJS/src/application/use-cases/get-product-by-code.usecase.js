const { NotFoundError } = require('../../domain/errors');

class GetProductByCodeUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(code) {
    const product = await this.productRepository.findByCode(code);
    if (!product) {
      throw new NotFoundError(`No existe un producto con el código ${code}`);
    }
    return product;
  }
}

module.exports = GetProductByCodeUseCase;