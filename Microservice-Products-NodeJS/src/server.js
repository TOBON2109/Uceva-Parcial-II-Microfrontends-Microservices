const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Microservicio de Productos en http://localhost:${PORT}`);
});