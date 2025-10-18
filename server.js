const connectDB = require('./config/db');
const express = require('express');
const app = express();

app.use(express.json());

// Montar routers
app.use('/users', require('./routes/users.routes'));
app.use('/books', require('./routes/book.routes')); // NOTA: singular 'book.routes'

// Conectar a MongoDB
connectDB();

module.exports = app;
