const Product = require('../../domain/entities/product');
const { ConflictError } = require('../../domain/errors');

class CreateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(data) {
    const product = Product.create(data);
    const existing = await this.productRepository.findByCode(product.code);
    if (existing) {
      throw new ConflictError(`Ya existe un producto con el código ${product.code}`);
    }
    return this.productRepository.save(product);
  }
}

module.exports = CreateProductUseCase;