import pool from '../bd.js';

export const getVentas = async () => {
  const [rows] = await pool.query('SELECT * FROM ventas');
  return rows;
};

export const getVenta = async (id) => {
  const [rows] = await pool.query('SELECT * FROM ventas WHERE ID = ?', [id]);
  return rows[0];
};

export const createVenta = async (venta) => {
  const { producto, cantidad } = venta;
  const [result] = await pool.query(
    'INSERT INTO ventas (producto, cantidad) VALUES (?, ?)',
    [producto, cantidad]
  );
  return result.insertId;
};

export const updateVenta = async (id, venta) => {
  const { fecha, producto, cantidad } = venta;
  const [result] = await pool.query(
    'UPDATE ventas SET fecha = ?, producto = ?, cantidad = ? WHERE ID = ?',
    [fecha, producto, cantidad, id]
  );
  return result.affectedRows;
};

export const deleteVenta = async (id) => {
  const [result] = await pool.query('DELETE FROM ventas WHERE ID = ?', [id]);
  return result.affectedRows;
};