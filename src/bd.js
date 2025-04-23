import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'tienda_online',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;