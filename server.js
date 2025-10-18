const express = require('express');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


app.use('/users', require('./routes/users.routes'));
app.use('/books', require('./routes/book.routes'));

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint no encontrado" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error interno del servidor", error: err.message });
});

connectDB()
  .then(() => {
    console.log('Conexión a MongoDB realizada ✅');
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err.message);
    process.exit(1);
  });

module.exports = app;
