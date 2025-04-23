import pool from '../bd.js';

export const getUsuarios = async () => {
  const [rows] = await pool.query('SELECT ID, nombre, correo, tipo FROM usuarios');
  return rows;
};

export const getUsuario = async (id) => {
  const [rows] = await pool.query('SELECT ID, nombre, correo, tipo FROM usuarios WHERE ID = ?', [id]);
  return rows[0];
};

export const createUsuario = async (usuario) => {
  const { nombre, correo, contraseña, tipo } = usuario;
  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre, correo, contraseña, tipo) VALUES (?, ?, ?, ?)',
    [nombre, correo, contraseña, tipo]
  );
  return result.insertId;
};

export const updateUsuario = async (id, usuario) => {
  const { nombre, correo, contraseña, tipo } = usuario;
  const [result] = await pool.query(
    'UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ?, tipo = ? WHERE ID = ?',
    [nombre, correo, contraseña, tipo, id]
  );
  return result.affectedRows;
};

export const deleteUsuario = async (id) => {
  const [result] = await pool.query('DELETE FROM usuarios WHERE ID = ?', [id]);
  return result.affectedRows;
};

export const loginUsuario = async (correo, contraseña) => {
  const [rows] = await pool.query('SELECT ID, nombre, correo, tipo FROM usuarios WHERE correo = ? AND contraseña = ?', [correo, contraseña]);
  return rows[0];
};