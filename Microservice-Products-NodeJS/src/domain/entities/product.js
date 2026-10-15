const { ValidationError } = require('../errors');

class Product {
  constructor({ code, name, description, price, stock }) {
    this.code = code;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }

  static create({ code, name, description = '', price, stock }) {
    if (typeof code !== 'string' || code.trim() === '') {
      throw new ValidationError('El código es obligatorio');
    }
    if (typeof name !== 'string' || name.trim() === '') {
      throw new ValidationError('El nombre es obligatorio');
    }
    if (typeof price !== 'number' || price < 0) {
      throw new ValidationError('El precio debe ser un número mayor o igual a 0');
    }
    if (!Number.isInteger(stock) || stock < 0) {
      throw new ValidationError('El stock debe ser un entero mayor o igual a 0');
    }
    return new Product({
      code: code.trim(),
      name: name.trim(),
      description,
      price,
      stock,
    });
  }
}

module.exports = Product;