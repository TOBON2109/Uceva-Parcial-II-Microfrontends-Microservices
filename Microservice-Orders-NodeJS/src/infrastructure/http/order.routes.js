const { Router } = require('express');

function createOrderRoutes(controller) {
  const router = Router();
  router.get('/', controller.list);
  router.post('/', controller.create);
  router.get('/:id', controller.getById);
  return router;
}

module.exports = createOrderRoutes;