const ProductRepository = require('../../domain/repositories/product.repository');
const Product = require('../../domain/entities/product');

class InMemoryProductRepository extends ProductRepository {
  constructor() {
    super();
    this.products = [
      new Product({ code: 'P001', name: 'Teclado mecánico', description: 'Teclado USB', price: 120000, stock: 25 }),
      new Product({ code: 'P002', name: 'Mouse inalámbrico', description: 'Mouse 2.4GHz', price: 65000, stock: 40 }),
      new Product({ code: 'P003', name: 'Monitor 24"', description: 'Monitor Full HD', price: 580000, stock: 12 }),
    ];
  }

  async findAll() {
    return this.products;
  }

  async findByCode(code) {
    return this.products.find((p) => p.code === code) || null;
  }

  async save(product) {
    this.products.push(product);
    return product;
  }
}

module.exports = InMemoryProductRepository;