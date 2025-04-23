import pool from '../bd.js';

export const getProductos = async () => {
  const [rows] = await pool.query('SELECT * FROM productos');
  return rows;
};

export const getProducto = async (id) => {
  const [rows] = await pool.query('SELECT * FROM productos WHERE ID = ?', [id]);
  return rows[0];
};

export const createProducto = async (producto) => {
  const { producto: nombre, descripcion, cantidad } = producto;
  const [result] = await pool.query(
    'INSERT INTO productos (producto, descripcion, cantidad) VALUES (?, ?, ?)',
    [nombre, descripcion, cantidad]
  );
  return result.insertId;
};

export const updateProducto = async (id, producto) => {
  const { producto: nombre, descripcion, cantidad } = producto;
  const [result] = await pool.query(
    'UPDATE productos SET producto = ?, descripcion = ?, cantidad = ? WHERE ID = ?',
    [nombre, descripcion, cantidad, id]
  );
  return result.affectedRows;
};

export const deleteProducto = async (id) => {
  const [result] = await pool.query('DELETE FROM productos WHERE ID = ?', [id]);
  return result.affectedRows;
};