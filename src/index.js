import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productosRouter from './view/view.productos.js';
import usuariosRouter from './view/view.usuarios.js';
import ventasRouter from './view/view.ventas.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/productos', productosRouter);
app.use('/usuarios', usuariosRouter);
app.use('/ventas', ventasRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de Tienda Online');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});