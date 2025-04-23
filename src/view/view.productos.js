import { Router } from 'express';
import * as productoController from '../controller/controller.productos.js';

const router = Router();

router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.obtenerProducto);
router.post('/', productoController.crearProducto);
router.put('/:id', productoController.actualizarProducto);
router.delete('/:id', productoController.eliminarProducto);

export default router;