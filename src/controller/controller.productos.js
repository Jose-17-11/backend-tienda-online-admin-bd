import * as productoModel from '../model/model.productos.js';

export const obtenerProductos = async (req, res) => {
  try {
    const productos = await productoModel.getProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const producto = await productoModel.getProducto(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const id = await productoModel.createProducto(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const affectedRows = await productoModel.updateProducto(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const affectedRows = await productoModel.deleteProducto(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};