const { ValidationError, NotFoundError, ConflictError } = require('../../domain/errors');

function handleError(res, err) {
  if (err instanceof ValidationError) return res.status(400).json({ message: err.message });
  if (err instanceof NotFoundError) return res.status(404).json({ message: err.message });
  if (err instanceof ConflictError) return res.status(409).json({ message: err.message });
  console.error(err);
  return res.status(500).json({ message: 'Error interno del servidor' });
}

function createOrderController({ listOrders, createOrder, getOrderById }) {
  return {
    async list(req, res) {
      try {
        res.json(await listOrders.execute());
      } catch (err) {
        handleError(res, err);
      }
    },
    async create(req, res) {
      try {
        const order = await createOrder.execute(req.body);
        res.status(201).json(order);
      } catch (err) {
        handleError(res, err);
      }
    },
    async getById(req, res) {
      try {
        res.json(await getOrderById.execute(req.params.id));
      } catch (err) {
        handleError(res, err);
      }
    },
  };
}

module.exports = createOrderController;