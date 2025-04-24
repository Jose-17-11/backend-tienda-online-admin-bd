-- init.sql
CREATE DATABASE IF NOT EXISTS tienda_online;

USE tienda_online;

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  producto VARCHAR(100) NOT NULL,
  descripcion TEXT,
  cantidad INT NOT NULL DEFAULT 0
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  tipo ENUM('admin', 'cliente', 'empleado') NOT NULL DEFAULT 'cliente'
);

-- Tabla de ventas
CREATE TABLE IF NOT EXISTS ventas (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  producto INT NOT NULL,
  cantidad INT NOT NULL,
  FOREIGN KEY (producto) REFERENCES productos(ID)
);

-- Insertar datos iniciales de prueba (opcional)
INSERT INTO productos (producto, descripcion, cantidad) VALUES 
('Laptop', 'Laptop de última generación', 10),
('Smartphone', 'Teléfono inteligente', 20),
('Tablet', 'Tablet de 10 pulgadas', 15);

INSERT INTO usuarios (nombre, correo, contraseña, tipo) VALUES 
('Admin', 'admin@tienda.com', 'admin123', 'admin'),
('Cliente', 'cliente@tienda.com', 'cliente123', 'cliente');

INSERT INTO ventas (producto, cantidad) VALUES 
(1, 2),
(2, 3);