import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',  // 'db' es el nombre del servicio en docker-compose
  user: process.env.DB_USER || 'tienda_user',
  password: process.env.DB_PASSWORD || 'tienda_pass',
  database: process.env.DB_NAME || 'tienda_online',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;