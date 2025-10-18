const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

router.get('/book/:bookId', bookController.getBookById);
router.get('/:userId', bookController.getBooks);
router.get('/', bookController.getAllBooks);

router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
