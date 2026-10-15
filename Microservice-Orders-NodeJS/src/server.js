const app = require('./app');

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Microservicio de Órdenes en http://localhost:${PORT}`);
  console.log(`Swagger: http://localhost:${PORT}/api/docs`);
});