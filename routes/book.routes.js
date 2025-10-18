const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

router.get('/:userId', bookController.getBooks);
router.get('/:bookId', bookController.getBookByUserId);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
