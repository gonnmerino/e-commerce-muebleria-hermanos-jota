const express = require('express');
const logger = require('./middlewares/logger.middleware');
const productsRouter = require('./routes/products.routes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.get('/api/v1', (req, res) => {
  res.send('Documentacion sobre la api.'); // TODO: Crear documentacion de la api (rutas, versionado, funcionalidad, etc).
});

app.use('/api/v1/products', productsRouter);

app.use((req, res) => {
  res.status(404).json({ message: `La ruta ${req.originalUrl} no existe. Verifica la version, o la documentacion.` });
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});