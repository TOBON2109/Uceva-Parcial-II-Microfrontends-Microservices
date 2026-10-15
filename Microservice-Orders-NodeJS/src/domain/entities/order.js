const { ValidationError } = require('../errors');

class Order {
  constructor({ id, supplierNit, items, total, status, createdAt }) {
    this.id = id;
    this.supplierNit = supplierNit;
    this.items = items;
    this.total = total;
    this.status = status;
    this.createdAt = createdAt;
  }

  static create({ supplierNit, items }) {
    if (typeof supplierNit !== 'string' || supplierNit.trim() === '') {
      throw new ValidationError('El NIT del proveedor es obligatorio');
    }
    if (!Array.isArray(items) || items.length === 0) {
      throw new ValidationError('La orden debe tener al menos un ítem');
    }

    items.forEach((item) => {
      if (typeof item.productCode !== 'string' || item.productCode.trim() === '') {
        throw new ValidationError('Cada ítem debe tener un código de producto');
      }
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        throw new ValidationError('La cantidad debe ser un entero mayor a 0');
      }
      if (typeof item.unitPrice !== 'number' || item.unitPrice < 0) {
        throw new ValidationError('El precio unitario debe ser un número mayor o igual a 0');
      }
    });

    const total = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    return new Order({
      id: null,
      supplierNit: supplierNit.trim(),
      items: items.map((item) => ({
        productCode: item.productCode.trim(),
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      total,
      status: 'PENDIENTE',
      createdAt: new Date().toISOString(),
    });
  }
}

module.exports = Order;