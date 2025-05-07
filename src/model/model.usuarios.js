import pool from '../bd.js';
import { hashPassword, comparePassword, encrypt, decrypt } from '../utils/encriptation.js';

export const getUsuarios = async () => {
  const [rows] = await pool.query('SELECT ID, nombre, correo, tipo FROM usuarios');
  return rows;
};

export const getUsuario = async (id) => {
  const [rows] = await pool.query('SELECT ID, nombre, correo, tipo FROM usuarios WHERE ID = ?', [id]);
  return rows[0];
};

export const createUsuario = async (usuario) => {
  const { nombre, correo, contrasena, tipo } = usuario;
  
  // Encriptar la contraseña
  const hashedPassword = await hashPassword(contrasena);
  
  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre, correo, contrasena, tipo) VALUES (?, ?, ?, ?)',
    [nombre, correo, hashedPassword, tipo]
  );
  return result.insertId;
};

export const updateUsuario = async (id, usuario) => {
  const { nombre, correo, contrasena, tipo } = usuario;
  
  let hashedPassword = null;
  if (contrasena) {
    hashedPassword = await hashPassword(contrasena);
  }
  
  // Actualizar contraseña solo si se proporcionó
  const query = contrasena 
    ? 'UPDATE usuarios SET nombre = ?, correo = ?, contrasena = ?, tipo = ? WHERE ID = ?'
    : 'UPDATE usuarios SET nombre = ?, correo = ?, tipo = ? WHERE ID = ?';
  
  const params = contrasena 
    ? [nombre, correo, hashedPassword, tipo, id]
    : [nombre, correo, tipo, id];
  
  const [result] = await pool.query(query, params);
  return result.affectedRows;
};

export const deleteUsuario = async (id) => {
  const [result] = await pool.query('DELETE FROM usuarios WHERE ID = ?', [id]);
  return result.affectedRows;
};

export const loginUsuario = async (correo, contrasena) => {
  // Primero obtener el usuario por correo
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  
  if (rows.length === 0) {
    return null;
  }
  
  const usuario = rows[0];
  
  // Comparar la contraseña proporcionada con el hash almacenado
  const passwordMatch = await comparePassword(contrasena, usuario.contrasena);
  
  if (!passwordMatch) {
    return null;
  }
  
  // Devolver datos del usuario sin la contraseña
  return {
    ID: usuario.ID,
    nombre: usuario.nombre,
    correo: usuario.correo,
    tipo: usuario.tipo
  };
};