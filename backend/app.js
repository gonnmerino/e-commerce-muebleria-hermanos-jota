const express = require('express');
const cors = require('cors');
const { STATUS_CODES } = require('http');
const logger = require('./middlewares/logger.middleware');
const connectDB = require('./db.js');
const productsRouter = require('./routes/products.routes');
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
      "POST /api/products": "Crear un nuevo producto",
      "GET /api/products": "Obtener el listado completo de productos",
      "GET /api/products/:id": "Obtener un producto específico por su ID",
      "PUT /api/products/:id": "Actualizar un producto",
      "DELETE /api/products/:id": "Eliminar un producto específico por su ID"
    }
  })
});

app.use('/api/products', productsRouter);

app.use((req, res) => {
  res.status(404).json({ message: `La ruta ${req.originalUrl} no existe. Verifica la version, o la documentacion.` });
})

app.use((err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(404).json({ error: 'Not Found', message: 'Recurso no encontrado (id inválido).' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Bad Request', message: err.message });
  }
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: STATUS_CODES[statusCode],
    message: statusCode >= 500 ? 'Ocurrió un error inesperado en el servidor.' : err.message
  });
});
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
})
