const { ValidationError, NotFoundError, ConflictError } = require('../../domain/errors');

function handleError(res, err) {
  if (err instanceof ValidationError) return res.status(400).json({ message: err.message });
  if (err instanceof NotFoundError) return res.status(404).json({ message: err.message });
  if (err instanceof ConflictError) return res.status(409).json({ message: err.message });
  console.error(err);
  return res.status(500).json({ message: 'Error interno del servidor' });
}

function createProductController({ listProducts, createProduct, getProductByCode }) {
  return {
    async list(req, res) {
      try {
        res.json(await listProducts.execute());
      } catch (err) {
        handleError(res, err);
      }
    },
    async create(req, res) {
      try {
        const product = await createProduct.execute(req.body);
        res.status(201).json(product);
      } catch (err) {
        handleError(res, err);
      }
    },
    async getByCode(req, res) {
      try {
        res.json(await getProductByCode.execute(req.params.code));
      } catch (err) {
        handleError(res, err);
      }
    },
  };
}

module.exports = createProductController;