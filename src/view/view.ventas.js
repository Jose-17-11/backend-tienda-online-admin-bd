import { Router } from 'express';
import * as ventaController from '../controller/controller.ventas.js';

const router = Router();

router.get('/', ventaController.obtenerVentas);
router.get('/:id', ventaController.obtenerVenta);
router.post('/', ventaController.crearVenta);
router.put('/:id', ventaController.actualizarVenta);
router.delete('/:id', ventaController.eliminarVenta);

export default router;