const connectDB = require('./config/db');
const express = require('express');
const app = express();

app.use(express.json());

app.use('/users', require('./routes/users.routes'));
app.use('/books', require('./routes/book.routes'));

connectDB();

module.exports = app;
