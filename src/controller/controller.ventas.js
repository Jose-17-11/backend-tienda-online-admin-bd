import * as ventaModel from '../model/model.ventas.js';

export const obtenerVentas = async (req, res) => {
  try {
    const ventas = await ventaModel.getVentas();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerVenta = async (req, res) => {
  try {
    const venta = await ventaModel.getVenta(req.params.id);
    if (!venta) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearVenta = async (req, res) => {
  try {
    const id = await ventaModel.createVenta(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const actualizarVenta = async (req, res) => {
  try {
    const affectedRows = await ventaModel.updateVenta(req.params.id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.json({ message: 'Venta actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const eliminarVenta = async (req, res) => {
  try {
    const affectedRows = await ventaModel.deleteVenta(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.json({ message: 'Venta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};