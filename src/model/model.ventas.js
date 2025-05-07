import pool from '../bd.js';

export const getVentas = async () => {
  const [rows] = await pool.query(`
    SELECT v.*, u.nombre as cliente_nombre 
    FROM ventas v
    JOIN usuarios u ON v.usuario_id = u.ID
    ORDER BY v.fecha DESC
  `);
  return rows;
};

export const getVenta = async (id) => {
  // Obtener información básica de la venta
  const [venta] = await pool.query('SELECT * FROM ventas WHERE id = ?', [id]);
  
  if (!venta[0]) return null;

  // Obtener los detalles de la venta
  const [detalles] = await pool.query(`
    SELECT dv.*, p.producto as nombre_producto, p.imagen 
    FROM detalle_venta dv
    JOIN productos p ON dv.producto_id = p.ID
    WHERE dv.venta_id = ?
  `, [id]);

  return {
    ...venta[0],
    detalles: detalles
  };
};

export const createVenta = async (ventaData) => {
  const { usuario_id, productos } = ventaData;
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // Validar existencia y stock de productos
    for (const producto of productos) {
      const hayStock = await checkStock(producto.id, producto.cantidad);
      if (!hayStock) {
        throw new Error(`Stock insuficiente para el producto ID ${producto.id}`);
      }
    }

    // Calcular totales
    let total_productos = 0;
    let total_precio = 0;

    productos.forEach(p => {
      total_productos += p.cantidad;
      total_precio += (p.cantidad * p.precio_unitario);
    });

    // Insertar venta principal
    const [ventaResult] = await connection.query(
      'INSERT INTO ventas (usuario_id, total_productos, total_precio) VALUES (?, ?, ?)',
      [usuario_id, total_productos, total_precio]
    );
    const ventaId = ventaResult.insertId;

    // Procesar detalles y actualizar stock
    for (const producto of productos) {
      await connection.query(
        'INSERT INTO detalle_venta (venta_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [ventaId, producto.id, producto.cantidad, producto.precio_unitario]
      );

      await connection.query(
        'UPDATE productos SET cantidad = cantidad - ? WHERE ID = ?',
        [producto.cantidad, producto.id]
      );
    }

    await connection.commit();
    return ventaId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};


export const updateVenta = async (id, ventaData) => {
  const { fecha, total_productos, total_precio, usuario_id, productos } = ventaData;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Validar stock para los nuevos productos
    for (const producto of productos) {
      const hayStock = await checkStock(producto.id, producto.cantidad);
      if (!hayStock) {
        throw new Error(`Stock insuficiente para el producto ID ${producto.id}`);
      }
    }

    // 2. Restaurar stock de los productos antiguos (antes de actualizar)
    const [detallesAnteriores] = await connection.query(
      'SELECT producto_id, cantidad FROM detalle_venta WHERE venta_id = ?',
      [id]
    );

    for (const detalle of detallesAnteriores) {
      await connection.query(
        'UPDATE productos SET cantidad = cantidad + ? WHERE ID = ?',
        [detalle.cantidad, detalle.producto_id]
      );
    }

    // 3. Actualizar venta principal
    await connection.query(
      'UPDATE ventas SET fecha = ?, total_productos = ?, total_precio = ?, usuario_id = ? WHERE id = ?',
      [fecha, total_productos, total_precio, usuario_id, id]
    );

    // 4. Eliminar detalles antiguos
    await connection.query('DELETE FROM detalle_venta WHERE venta_id = ?', [id]);

    // 5. Insertar nuevos detalles y descontar stock
    for (const producto of productos) {
      await connection.query(
        'INSERT INTO detalle_venta (venta_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [id, producto.id, producto.cantidad, producto.precio_unitario]
      );

      await connection.query(
        'UPDATE productos SET cantidad = cantidad - ? WHERE ID = ?',
        [producto.cantidad, producto.id]
      );
    }

    await connection.commit();
    return { success: true };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const deleteVenta = async (id) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // 1. Obtener detalles para restaurar stock
    const [detalles] = await connection.query(
      'SELECT producto_id, cantidad FROM detalle_venta WHERE venta_id = ?',
      [id]
    );

    // 2. Restaurar stock en productos
    for (const detalle of detalles) {
      await connection.query(
        'UPDATE productos SET cantidad = cantidad + ? WHERE ID = ?',
        [detalle.cantidad, detalle.producto_id]
      );
    }

    // 3. Eliminar detalles de venta
    await connection.query('DELETE FROM detalle_venta WHERE venta_id = ?', [id]);

    // 4. Eliminar venta principal
    const [result] = await connection.query('DELETE FROM ventas WHERE id = ?', [id]);

    await connection.commit();
    return result.affectedRows;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const checkStock = async (productoId, cantidadRequerida) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const [rows] = await connection.query(
      'SELECT cantidad FROM productos WHERE ID = ? AND cantidad >= ? FOR UPDATE',
      [productoId, cantidadRequerida]
    );
    
    await connection.commit();
    return rows.length > 0;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};