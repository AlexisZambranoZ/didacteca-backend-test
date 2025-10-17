const mysql = require("mysql2/promise"); // usar Promises para async/await

// Configuración de la conexión
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root", // cambia por tu contraseña
  database: "usersdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
