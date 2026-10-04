const express = require('express');
const cors = require('cors');
const { STATUS_CODES } = require('http');
const dotenv = require('dotenv');
const logger = require('./middlewares/logger.middleware');
const productsRouter = require('./routes/products.routes');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(logger);
app.use(cors());

app.get('/api', (req, res) => {
  res.json({
    name: "API Mueblería Hermanos Jota",
    version: "1.0.0",
    description: "Endpoints disponibles para consultar el catálogo de productos.",
    endpoints: {
      "GET /api/products": "Obtener el listado completo de productos",
      "GET /api/products/:productId": "Obtener un producto específico por su ID"
    }
  })
});

app.use('/api/products', productsRouter);

app.use((req, res) => {
  res.status(404).json({ message: `La ruta ${req.originalUrl} no existe. Verifica la version, o la documentacion.` });
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: STATUS_CODES[statusCode],
    message: statusCode >= 500 ? 'Ocurrió un error inesperado en el servidor.' : err.message
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});