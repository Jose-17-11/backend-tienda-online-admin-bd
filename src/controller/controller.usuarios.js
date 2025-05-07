import * as usuarioModel from '../model/model.usuarios.js';

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await usuarioModel.getUsuario(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const id = await usuarioModel.createUsuario(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const affectedRows = await usuarioModel.updateUsuario(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const affectedRows = await usuarioModel.deleteUsuario(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    
    if (!correo || !contrasena) {
      return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }
    
    const usuario = await usuarioModel.loginUsuario(correo, contrasena);
    
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};