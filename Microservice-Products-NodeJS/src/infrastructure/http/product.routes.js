const { Router } = require('express');

function createProductRoutes(controller) {
  const router = Router();
  router.get('/', controller.list);
  router.post('/', controller.create);
  router.get('/:code', controller.getByCode);
  return router;
}

module.exports = createProductRoutes;