import { Router } from 'express';
import * as usuarioController from '../controller/controller.usuarios.js';

const router = Router();

router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuario);
router.post('/', usuarioController.crearUsuario);
router.post('/login', usuarioController.login);
router.put('/:id', usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);

export default router;