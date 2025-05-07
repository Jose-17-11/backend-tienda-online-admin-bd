-- init.sql
CREATE DATABASE IF NOT EXISTS tienda_online;

USE tienda_online;

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  producto VARCHAR(100) NOT NULL,
  descripcion TEXT,
  cantidad INT NOT NULL DEFAULT 0,
  imagen VARCHAR(255) DEFAULT NULL,
  precio DECIMAL(10, 2) NOT NULL DEFAULT 0.00
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  tipo ENUM('admin', 'cliente') NOT NULL DEFAULT 'cliente'
);

-- Tabla de ventas
CREATE TABLE IF NOT EXISTS ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total_productos INT NOT NULL,
  total_precio DECIMAL(10, 2) NOT NULL,
  usuario_id INT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(ID)
);

CREATE TABLE IF NOT EXISTS detalle_venta (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (venta_id) REFERENCES ventas(id),
  FOREIGN KEY (producto_id) REFERENCES productos(ID)
);