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
  const { producto: nombre, descripcion, cantidad, imagen, precio } = producto;
  const [result] = await pool.query(
    'INSERT INTO productos (producto, descripcion, cantidad, imagen, precio) VALUES (?, ?, ?, ?, ?)',
    [nombre, descripcion, cantidad, imagen, precio]
  );
  return result.insertId;
};

export const updateProducto = async (id, producto) => {
  const fields = [];
  const values = [];
  
  if (producto.producto !== undefined) {
    fields.push('producto = ?');
    values.push(producto.producto);
  }
  if (producto.descripcion !== undefined) {
    fields.push('descripcion = ?');
    values.push(producto.descripcion);
  }
  if (producto.cantidad !== undefined) {
    fields.push('cantidad = ?');
    values.push(producto.cantidad);
  }
  if (producto.imagen !== undefined) {
    fields.push('imagen = ?');
    values.push(producto.imagen);
  }
  if (producto.precio !== undefined) {
    fields.push('precio = ?');
    values.push(producto.precio);
  }
  
  if (fields.length === 0) {
    throw new Error('No fields to update');
  }
  
  const query = `UPDATE productos SET ${fields.join(', ')} WHERE ID = ?`;
  values.push(id);
  
  const [result] = await pool.query(query, values);
  return result.affectedRows;
};

export const deleteProducto = async (id) => {
  const [result] = await pool.query('DELETE FROM productos WHERE ID = ?', [id]);
  return result.affectedRows;
};

