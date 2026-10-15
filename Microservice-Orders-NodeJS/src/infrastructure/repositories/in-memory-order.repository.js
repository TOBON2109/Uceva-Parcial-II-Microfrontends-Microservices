const OrderRepository = require('../../domain/repositories/order.repository');
const Order = require('../../domain/entities/order');

class InMemoryOrderRepository extends OrderRepository {
  constructor() {
    super();
    this.nextId = 3;
    this.orders = [
      new Order({
        id: 1,
        supplierNit: '900123456-1',
        items: [
          { productCode: 'P001', quantity: 10, unitPrice: 100000 },
          { productCode: 'P002', quantity: 20, unitPrice: 50000 },
        ],
        total: 2000000,
        status: 'PENDIENTE',
        createdAt: '2026-10-01T10:00:00.000Z',
      }),
      new Order({
        id: 2,
        supplierNit: '900654321-2',
        items: [{ productCode: 'P003', quantity: 5, unitPrice: 500000 }],
        total: 2500000,
        status: 'PENDIENTE',
        createdAt: '2026-10-05T15:30:00.000Z',
      }),
    ];
  }

  async findAll() {
    return this.orders;
  }

  async findById(id) {
    return this.orders.find((o) => o.id === id) || null;
  }

  async save(order) {
    order.id = this.nextId++;
    this.orders.push(order);
    return order;
  }
}

module.exports = InMemoryOrderRepository;